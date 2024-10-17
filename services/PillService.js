const sequelize = require('../db'); // db.js에서 Sequelize 인스턴스 가져오기
const axios = require('axios');

const xml2js = require('xml2js');
const PillDTO = require('../dtos/PillDto');
const PillInfoDTO = require('../dtos/PillInfoDto');
const PillDocDTO = require('../dtos/PillDocDto');
const Pill = require('../models/Pill');

class PillService {
    async getPills(serviceKey, infoUrl, docUrl) {
        try {
            let pageNo = 461;
            const numOfRows = 100;
            let hasMorePills = true;
            const pills = [];

            while (hasMorePills) {

                // info 공공데이터 API 요청
                const infoUrlWithParams = `${infoUrl}?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}`;
                const infoResponse = await axios.get(infoUrlWithParams);

                const pillInfoList = await this.pillInfoApiParseXml(infoResponse.data);
                //console.log((await pillInfoList).length);

                // doc 공공데이터 API 요청
                const docUrlWithParams = `${docUrl}?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}`;
                const docResponse = await axios.get(docUrlWithParams);

                const pillDocList = await this.pillDocApiParseXml(docResponse.data);
                //console.log((await pillDocList).length);

                //PillDto 만들고 DB에 저장
                const savedPills = await this.buildPillDtoAndSave(pillInfoList, pillDocList);
                console.log('saves Num : ', savedPills.length);

                // 저장된 엔티티 객체가 하나도 없다면
                if (savedPills.length === 0) {
                    hasMorePills = false;
                } else {
                    pageNo++; // 다음 페이지로 이동
                }

                // savedPills가 배열인지 확인
                if (Array.isArray(savedPills)) {
                    pills.push(...savedPills); // 페이지마다 저장한 엔티티 객체 추가
                } else {
                    console.error('savedPills is not an array:', savedPills);
                }
            }

            return pills;

        } catch (error) {
            console.error('Error fetching pills:', error);
        }

    }

    async pillInfoApiParseXml(xmlData) {
        const pillInfoDtoList = [];

        try {
            const parser = new xml2js.Parser();
            const result = await parser.parseStringPromise(xmlData); // XML 파싱

            const items = result.response.body[0].items[0].item; // 'items' 태그 아래의 'item' 노드들

            if (Array.isArray(items)) { // items가 배열인지 확인
                items.forEach(item => {
                    const itemName = this.getElementValue(item, 'ITEM_NAME');
                    const itemIngrName = this.getElementValue(item, 'ITEM_INGR_NAME');
                    const productType = this.getElementValue(item, 'PRDUCT_TYPE');
                    const bigPrdtImgUrl = this.getElementValue(item, 'BIG_PRDT_IMG_URL');
    
                    const pillInfoDto = new PillInfoDTO(itemName, itemIngrName, productType, bigPrdtImgUrl);
                    pillInfoDtoList.push(pillInfoDto);
                    //console.log(pillInfoDto.item_name);
                });
            }
        } catch (error) {
            console.error('Error parsing XML:', error);
        }

        return pillInfoDtoList;
    }

    getElementValue(item, tagName) {
        return item[tagName] && item[tagName][0] ? item[tagName][0] : null;
    }


    async pillDocApiParseXml(xmlData) {
        const pillDocDtoList = [];

        try {
            const parser = new xml2js.Parser();
            const result = await parser.parseStringPromise(xmlData); // XML 파싱

            const items = result.response.body[0].items[0].item; // 'items' 태그 아래의 'item' 노드들

            if (Array.isArray(items)) {
                items.forEach(item => {
                    const eeDocData = this.getElementDocValue(item, 'EE_DOC_DATA');
                    const udDocData = this.getElementDocValue(item, 'UD_DOC_DATA');
                    const nbDocData = this.getElementDocValue(item, 'NB_DOC_DATA');
    
                    const pillDocDto = new PillDocDTO(eeDocData, udDocData, nbDocData);
                    pillDocDtoList.push(pillDocDto);
                    //console.log(pillDocDto.ee_doc_data);
                });
            }
            
        } catch (error) {
            console.error('Error parsing XML:', error);
        }

        return pillDocDtoList;
    }

    getElementDocValue(element, tagName) {
        let resultString = ''; // 결과를 저장할 문자열

        if (element[tagName] && element[tagName][0]) {
            const articles = element[tagName][0].DOC[0].SECTION[0].ARTICLE;

            if (articles) {
                for (const article of articles) {
                    const title = article.$.title; // ARTICLE의 title 속성
                    if (title) {
                        resultString += `${title}\n`;
                    }

                    // PARAGRAPH 내용 추출
                    if (article.PARAGRAPH) {
                        for (const paragraph of article.PARAGRAPH) {
                            const text = paragraph._; // PARAGRAPH의 내용
                            if (text) {
                                resultString += `${text.trim()}\n`; // 내용을 추가
                            }
                        }
                    }
                }
            }
        }

        return resultString.trim() ? resultString : null; // 비어 있으면 null 반환
    }

    async buildPillDtoAndSave(pillInfoDtoList, pillDocDtoList) {
        // PillDTO 생성 및 저장 로직
        const pillDtoList = [];

        // 두 리스트가 동일 순서로 약 정보를 반환한다고 가정
        //console.log('pillInfoDtoList.length: ', pillInfoDtoList.length);
        for (let i = 0; i < pillInfoDtoList.length; i++) {
            const pillInfoDto = pillInfoDtoList[i];
            const pillDocDto = pillDocDtoList[i];

            const pillDto = new PillDTO(
                pillInfoDto.item_name,
                pillInfoDto.item_ingr_name,
                pillInfoDto.product_type,
                pillDocDto.ee_doc_data,
                pillDocDto.ud_doc_data,
                pillDocDto.nb_doc_data,
                pillInfoDto.big_prdt_img_url,
            );
            //console.log(pillDto.item_name, pillDto.ee_doc_data);
            pillDtoList.push(pillDto);
        }

        return await this.savePillList(pillDtoList);
    }

    async savePillList(pillDtoList) {
        if (!pillDtoList || pillDtoList.length === 0) {
            return []; // 빈 리스트 반환
        }

        const savedPillList = [];

        try {
            await sequelize.sync();

            for (const pillDto of pillDtoList) {

                const pill = await Pill.create({
                    item_name: pillDto.item_name,
                    item_ingr_name: pillDto.item_ingr_name,
                    product_type: pillDto.product_type,
                    ee_doc_data: pillDto.ee_doc_data,
                    ud_doc_data: pillDto.ud_doc_data,
                    nb_doc_data: pillDto.nb_doc_data,
                    big_prdt_img_url: pillDto.big_prdt_img_url,
                });

                //console.log('Pill saved:', pill.toJSON());
                savedPillList.push(pill); // 저장된 Pill 객체 추가
            }

        } catch (error) {
            console.error('Error saving pill data:', error);
        }

        //console.log(savedPillList.length);
        return savedPillList; // 성공적으로 저장된 Pill 객체 반환
    }

}

module.exports = new PillService();

const PillService = require('../services/PillService');
const PillSearchDto = require('../dtos/response/PillSearchDto');
const Pill = require('../models/Pill');
const { Op } = require('sequelize'); // Sequelize의 Op 가져오기


exports.fetch = async (req, res) => {
    const serviceKey = process.env.OPEN_API_SERVICE_KEY;
    const infoUrl = process.env.OPEN_API_INFO_URL;
    const docUrl = process.env.OPEN_API_DOC_URL;

    try {
        const savedPillList = await PillService.getPills(serviceKey, infoUrl, docUrl);
        res.status(200).json({
            message: '의약품 정보 저장에 성공했습니다.',
            savedPillNumber: savedPillList.length
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 의약품 검색 컨트롤러
exports.search = async (req, res) => {
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: "Internal Server Error" });
    }

    try {
        // 검색어를 포함하는 의약품 리스트 조회
        const pills = await Pill.findAll({
            where: {
                item_name: {
                    [Op.like]: `%${query.trim()}%` // Sequelize의 Op.like를 사용하여 부분 일치를 수행
                }
            }
        });

        // 필요한 정보를 담은 PillSearchDTO 리스트 생성
        const pillSearchDtos = pills.map(pill => new PillSearchDto(
            pill.id,
            pill.item_name,
            pill.product_type,
            pill.big_prdt_img_url 
        ));

        res.status(200).json(pillSearchDtos); // DTO 리스트 반환
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류", error });
    }
};
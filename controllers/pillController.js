const PillService = require('../services/PillService');

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
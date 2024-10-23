class PillInfoDTO {
    constructor(item_name, item_ingr_name, product_type, big_prdt_img_url) {
        this.item_name = item_name;
        this.item_ingr_name = item_ingr_name;
        this.product_type = product_type;
        this.big_prdt_img_url = big_prdt_img_url;
    }
}

module.exports = PillInfoDTO;

class PillDTO {
    constructor(item_name, item_ingr_name, product_type, ee_doc_data, ud_doc_data, nb_doc_data, big_prdt_img_url) {
        this.item_name = item_name;
        this.item_ingr_name = item_ingr_name;
        this.product_type = product_type;
        this.ee_doc_data = ee_doc_data;
        this.ud_doc_data = ud_doc_data;
        this.nb_doc_data = nb_doc_data;
        this.big_prdt_img_url = big_prdt_img_url;
    }
}

module.exports = PillDTO;

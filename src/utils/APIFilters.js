class APIFilters {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    async search() {
        const keyword = this.queryStr.keyword ? {
            title: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};
        console.log(keyword);
        this.query = this.query.find({ ...keyword });
    }
}

export default APIFilters;
const {  default: mongoose } = require("mongoose");

const propertyReportSchema = new mongoose.Schema({
  reportingDate: {
    type: String,
    default: ()=> {
      const date = new Date();
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      return `${day}-${month+1}-${year}`;
    },
  },
  propertyId: {
    type: String,
    required: true,
  },
  reporterId: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true,
  },
  reporterName: {
    type: String,
    required: true,
  },
  reporterEmail: {
    type: String,
    required: true,
  },
  report: {
    type: String,
    required: true,
  },
});


const reportModel = mongoose.models.report || mongoose.model("report", propertyReportSchema);

export default reportModel;
import axios from "axios";
import { saveAs } from "file-saver";

export const saveByExcel = (listData) => {
    let Stringxls =
        "MSSV \t Họ tên \t Điểm hệ 10 \t Điểm hệ 3 \t Ngành \t Khoa \t Ngày sinh \t lớp \n ";
    listData.forEach((element) => {
        Stringxls += `${element.id} \t ${element.fullname} \t ${element.diemhe10} \t ${element.diemhe3} \t ${element.major} \t ${element.faculty} \t ${element.birth} \t ${element.class}  \n  `;
    });
    var blob = new Blob([Stringxls], {
        type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "static.xls");
};
export const getListDiem = async (listMssv) => {
    const res = await axios.post("http://localhost:5000/diem/list", listMssv);
    return res.data;
};
export const getListInfo = async (listMssv) => {
    const res = await axios.post("http://localhost:5000/diem/info", listMssv);
    return res.data;
};
export const mergeListInfoRecords = (listInfo, listRecords) => {
    const listResult = [];
    listInfo.forEach((e) => {
        const record = listRecords.find(record => e.id === record.id )
        Object.assign
    })
    return listResult;
};

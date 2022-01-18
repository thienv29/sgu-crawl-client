import axios from "axios";
import { saveAs } from "file-saver";
import { DOMAIN } from "./constant";

export const saveByExcel = (listData) => {
    let Stringxls =
        "MSSV , Họ tên , Điểm hệ 10 , Điểm hệ 4, Điểm hệ 3 , Ngành , Khoa , Ngày sinh , lớp \n ";
    listData.forEach((element) => {
        Stringxls += `
        ${element.id} , 
        ${element.fullname} , 
        ${element.diemhe10} , 
        ${element.diemhe3} , 
        ${element.tichLuy10} , 
        ${element.tichLuy4} , 
        ${element.diemhe3} , 
        ${element.major} , 
        ${element.faculty} , 
        ${element.birth} , 
        ${element.class}  \n  `;
    });
    var blob = new Blob([Stringxls], {
        type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "static.csv");
};
export const getListDiem = async (listMssv) => {
    const res = await axios.post(`${DOMAIN}/diem/list`, listMssv);
    return res.data;
};
export const getListInfo = async (listMssv) => {
    const res = await axios.post(`${DOMAIN}/diem/info`, listMssv);
    return res.data;
};
export const mergeListInfoRecords = (listInfo, listRecords) => {
    const listResult = [];
    listInfo.forEach((info) => {
        const record = listRecords.find(record => info.id === record.id )
        listResult.push(Object.assign(record,info))
    })
    return listResult;
};

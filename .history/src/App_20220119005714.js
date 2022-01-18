import "./app.scss";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import logo from "./logo.gif";
import { getListDiem, getListInfo, mergeListInfoRecords, saveByExcel } from "./lib";
//https://sguapi.herokuapp.com

function App() {
    console.log(process.env.DC_PORT);

    const [ListMssv, setListMssv] = useState("");
    const [Loading, setLoading] = useState(false);
    const handleClick = async () => {
        setLoading(true);

        const listDiem = await getListDiem(ListMssv)
        const listInfo = await getListInfo(ListMssv)
        const listResult = mergeListInfoRecords(listInfo.listSuccess,listDiem.listSuccess)
        console.log();
        saveByExcel(listResult)
        setLoading(false)

       
    };
    const hanhdleOnchange = (e) => {
        setListMssv(e.target.value.split("\n"));
    };
    return (
        <>
            <div className="App">
                <TextField
                    id="outlined-multiline-static"
                    label="Danh sách mã số sinh viên "
                    multiline
                    rows={10}
                    fullWidth
                    className="textfieds"
                    onChange={hanhdleOnchange}
                />
                <div className="">
                    <button
                        variant="contained"
                        className="div_button"
                        onClick={handleClick}
                    >
                        Send
                    </button>
                </div>
                <div
                    style={{
                        fontFamily: "arial",
                        textAlign: "center",
                        marginTop: "10px",
                    }}
                >
                    Vũ Quý Thiện DKP1191 SGU
                </div>
                {Loading ? (
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-content-main">
                                <img src={logo} alt="loaded" />
                                <span className="text-waiting">
                                    Thời gian chờ tùy vào số lượng sinh viên bạn cung cấp
                                </span>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            
        </>
    );
}

export default App;

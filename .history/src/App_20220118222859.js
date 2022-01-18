import "./app.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";

import logo from "./logo.gif";
import { getListDiem, getListInfo, mergeListInfoRecords } from "./lib";
//https://sguapi.herokuapp.com

function App() {
    console.log(process.env.DC_PORT);

    const [ListMssv, setListMssv] = useState("");
    const [Loading, setLoading] = useState(false);
    const [Listdiem, setListdiem] = useState([]);
    const [ListInfo, setListInfo] = useState([]);
    const handleClick = () => {
        setLoading(true);
        
        // getListDiem(ListMssv)
        // getListInfo(ListMssv)
        Promise.all([getListDiem(ListMssv),getListInfo(ListMssv)])
        .then(([diem,info]) => {
          console.log(diem,info);
            const listResult = mergeListInfoRecords(info,diem)
            console.log(listResult);
        })
        // axios
        //     .post("http://localhost:5000/diem/list", ListMssv)
        //     .then(function (response) {
        //         setLoading(false);
        //         setListdiem(response.data.listObjectDiem);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
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
                                <img src={logo} />
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

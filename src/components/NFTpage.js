import getSigner, { getContract } from "../bc/helper/web3Helper";
import { useEffect, useState, useContext } from "react";
import NFTOps, { mintToken } from "../bc/service/nftOps";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../utils/IPFSOperations";
import "./nftpage.css";
import Joi from "joi";



export default function NFTPage() {

    const [metadata, setMetaData] = useState({ key: "", val: "" });

    const [metalist, setMetalist] = useState([]);

    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");
    const [file, setFile] = useState();
    const [url, setUrl] = useState();
    const [fileURL, setFileURL] = useState("");
    
        useEffect(() => {
            (async () => {
                const signer = await getSigner();
                NFTOps.setSigner(signer);
               
            })()
    
    
        }
    
            , []);
     

    useEffect(() => {
        if (window.ethereum == undefined)
            return;
        else {
            getSigner().then((signer) => { NFTOps.setSigner(signer); });

        }

    }, []);

    function activateBtn(id, msg="") {
        const btn = document.getElementById(id);
        btn.disabled = false;
        if(msg){
            btn.textContent = msg;
        }
        
    }

    function deactiveBtn(id, msg="") {
        const btn = document.getElementById(id);
        btn.disabled = true;
        if(msg){
            btn.textContent = msg;
        }

    }




    async function uploadFile(e) {
        let err = "";
        deactiveBtn("btnUpload", "Uploading...");
        e.preventDefault();


        // check file is empty
        const schema = Joi.object({
            file: Joi.required().messages({ "any.required": "File need to be uploaded" })
        });
        const result = schema.validate({ "file": file }, { abortEarly: false });

        if (result.error) {
            result.error.details?.forEach((i) => { err += i.message + "\n" });
            alert(err);
        }
        else {
            // Upload file to IPFS
            const fileResp = await uploadFileToIPFS(file);
            let url = ""
            if (fileResp.success) {
                url = fileResp.pinataURL;
                
                setFileURL(url);
                alert("Upload succcess");
            }
            else{
                alert("Upload unsucccess");
            }

           
        }
        activateBtn("btnUpload", "Upload");



    }

    //Upload Attributes to IPFS
    async function uploadMetaData() {

        let data = { "name": name, "price": price };

        data = { ...data, "image": fileURL };

        if (metalist.length > 0) {
            data = { ...data, "attributes": metalist.map((item) => { return { [item.key]: item.val } }) };

        }

        const resp = await uploadJSONToIPFS(data);

        return resp.success ? resp.pinataURL : "";
    }


    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().greater(0).required(),
        file: Joi.string().required().messages({ "any.required": "File need to be uploaded" })
    });

    //Mint NFT
    async function mint(e) {

        deactiveBtn("btnMint", "Minting...");
        deactiveBtn("btnUpload");
        deactiveBtn("btnMeta");

        e.preventDefault();
        let err = "";


        const result = schema.validate({ "name": name, "price": price, "file": fileURL }, { abortEarly: false });

        if (result.error) {
            result.error.details?.forEach((i) => { err += i.message + "\n" });

            console.log(result);

            alert(err);
        }
        else {
            const dataURL = await uploadMetaData();

            const tx = await NFTOps.mintToken(price, dataURL);
            if(tx.hash){
                alert("Minting successful... Tx:"+ tx.hash);
                resetValues();
            }
            
        }
        activateBtn("btnMint", "Mint");
        activateBtn("btnUpload");
        activateBtn("btnMeta");


    }

    function resetValues(){
        document.getElementById('fl').value='';
        setFile();
        setFileURL("");
        setUrl("");
        setPrice(0);
        setMetaData({ key: "", val: "" });
        setName("");
    }

    function addMetaData() {

        if (metadata.key && metadata.val) {
            setMetalist([...metalist, metadata]);
            setMetaData({ key: "", val: "" });
        }


    }



    return (<div>

        <div className="dv">

            <div className="dv1">
                <h2>General Info</h2>
            </div>


            <table style={{ width: "100%" }}>
                <tbody>
                    <tr>
                        <td>
                            <div>
                                <div className="dv1">
                                    <label>Name</label>
                                    <input type="text" className="txt" onChange={(e) => { setName(e.target.value) }} value={name}  ></input>
                                </div>

                                <div className="dv1">
                                    <button id="btnUpload" onClick={uploadFile}>Upload</button>
                                    <input id="fl" className="txt" type={"file"} accept="image/*" onChange={(e) => { if (e.target.files) { setFile(e.target.files[0]); setUrl(URL.createObjectURL(e.target.files[0])) } }} ></input>
                                </div>

                            </div>

                        </td>
                        <td>
                            <div className="dv1 dv2">
                                <img id="img1" className="img" src={url}></img>
                            </div>


                        </td>

                    </tr>
                </tbody>

            </table>








        </div>

        <div className="dv">
            <div className="dv1">
                <h2>Meta Data</h2>
            </div>

            <div className="dv1">


                {metalist.map((item) => (
                    <div>
                        <input type="text" className="txt" value={item.key}></input>
                        <input type="text" className="txt" value={item.val}></input>

                    </div>

                ))}




                <input type="text" className="txt" onChange={e => setMetaData({ ...metadata, key: e.target.value })} value={metadata.key}></input>
                <input type="text" className="txt" onChange={e => setMetaData({ ...metadata, val: e.target.value })} value={metadata.val}></input>
                <button id="btnMeta" className="btn1" onClick={addMetaData}>+</button>
            </div>








        </div>

        <div className="dv">
            <div className="dv1">
                <h2>Price</h2>
            </div>

            <div className="dv1">
                <label>Amount</label>
                <input type="text" className="txt" onChange={(e) => { setPrice(e.target.value) }} value={price}></input>
            </div>

        </div>



        <div className="dvb">

            <button id="btnMint" style={{ "float": "right", "width": "100px", "height": "30px" }} onClick={mint}>Mint</button>
        </div>





    </div>);

}
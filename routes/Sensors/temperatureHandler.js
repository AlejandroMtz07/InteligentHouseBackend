import connection from "../../database/connection.js"

export const registerTemperature = (req, res)=>{
    
    const sqlQuery = "update devices set lastlecture = now(), lastdata=? where id = ?;";

    const {ambTemp} = req.body;
    const deviceId = req.params.deviceId;

    connection.query(
        sqlQuery,
        [ambTemp,deviceId],
        (error, result)=>{
            if(error){
                return res.status(500).send({msg: error});
            }
            res.status(200).send({msg: "Data registered"});
        }
    )

}
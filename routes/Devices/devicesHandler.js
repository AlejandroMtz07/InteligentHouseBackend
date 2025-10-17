import connection from "../../database/connection.js";

//Show all the user bonded devices
export const getAllDevices = async (req, res) => {

    const sqlQuery = "select * from devices where userId = ?;";
    connection.query(
        sqlQuery,
        [req.user.userId],
        (error, result) => {
            if (error) {
                return res.status(500).send(error);
            }
            if (result.length == 0) {
                return res.status(404).send({ msg: 'Any devices bounded' });
            }
            res.status(200).send(result);
        }
    )

}
//Returns the device state (only use on the esp32)
export const getDeviceStatus = (req, res) => {
    const sqlQuery = 'select (status) from devices where id = ?;'
    const deviceId = req.params.deviceId;
    connection.query(
        sqlQuery,
        [deviceId],
        (error, result) => {
            if (error) {
                return res.status(404).send({ msg: 'Device not found' });
            }
            if(result.length === 0){
                return res.status(404).send({msg: 'Device not found'});
            }
            res.status(200).send({ status: (result[0].status === 0 ? 'Inactive' : 'Active') });
        }
    )
}

//Endpoint showed in the qr code for bond the device to the user
export const bondDeviceToUser = (req, res) => {

    const sqlQuery = "update devices set userId = ?, status = true where id = ?;";
    const deviceId = req.params.deviceId;
    const userId = req.user.userId;

    connection.query(
        sqlQuery,
        [userId, deviceId],
        (error, result)=>{
            if(error){
                return res.status(500).send({msg: 'Something happend'})
            }
            if(result.length == 0){
                return res.status(404).send({msg: 'Device not found'});
            }
            res.status(200).send({msg: 'Device activated'});
        }
    )
}
export const editDeviceInformation = (req, res)=>{
    const sqlQuery = 'update devices set devicename = ?,  devicedescription = ? where id = ? and userId = ?;';
    const deviceId = req.params.deviceId;
    const userId = req.user.userId;
    const {devicename, devicedescription} = req.body;

    connection.query(
        sqlQuery,
        [devicename,devicedescription,deviceId,userId],
        (error, result)=>{
            if(error){
                return res.status(500).send({msg: error});
            }
            if(result.affectedRows == 0){
                return res.status(404).send({msg: 'Device not found'});
            }
            res.status(200).send({msg: 'Device updated successfully'});
        }
    )
}

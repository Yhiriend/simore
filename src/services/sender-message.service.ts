//const recoveryCodeTwilio = "YAK5BRQL1WLVNWJLJ8G4Y833";
import axiosInstance from "../config/axiosConfig";
interface SmsParams {
  to: string;
  message: string;
}

class SenderSMS {
  async sendSms(params: SmsParams) {
    try {
      const response = await axiosInstance.post("/sms/send", params);
      console.log("SMS enviado con éxito:", response.data);
    } catch (error) {
      console.error("Error enviando SMS:", error.message);
      throw new Error("No se pudo enviar el SMS");
    }
  }
}

const senderSms = new SenderSMS();
export default senderSms;

import api from "./api.service";

class OtpService {
  async resendOtp() {
    return await api.post(`/otp/resend-otp`);
  }
}

export default new OtpService();

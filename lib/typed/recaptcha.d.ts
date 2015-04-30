declare class Recaptcha {
	constructor();
    config(obj: { publickey?: string, privatekey?: string }): void;
    getResponse(): string;
    verifyCaptcha(response: string, clientAddress: string): RecaptchaResponse;
}

interface RecaptchaResponse {
    success: boolean;
    error?: string;
}

declare var reCAPTCHA: Recaptcha;
declare var grecaptcha: Recaptcha;

import { resend } from "@/lib/resend";
import EmailTemplate from "@/helpers/email-template";


export async function emailHelper(
    username:string,
    email:string,
    verifyCode:string,
    url:string
):Promise<any>{
    try {
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification Code',
            react: EmailTemplate({ username,verifyCode,url }),
          });
        return {success:true, message:"Email send Successfully"}

    } catch (error) {
        console.error("Error while sending an email")
        return {success:false, message:"Failed to send Email"}
    }
    
}
import os 
import smtplib
from email.mime.text import MIMEText
import traceback
from jinja2 import Environment, FileSystemLoader


class EmailSender:
    ENV = Environment(loader=FileSystemLoader('./'))

    def __init__(self, smtp_host: str, smtp_user: str, smtp_password: str, 
                 email_from: str, smtp_port: str = None, smtp_ssl: bool = True):
        port = smtp_port or (smtplib.SMTP_SSL_PORT if smtp_ssl else smtplib.SMTP_PORT)
        self.email_from = email_from
        smtp_fun = smtplib.SMTP_SSL if smtp_ssl else smtplib.SMTP
        self.smtp = smtp_fun(smtp_host, port)
        self.smtp.login(smtp_user, smtp_password)

    @property
    def template_path(self) -> str:
        return self.ENV.loader
    
    @template_path.setter
    def template_path(self, path):
        try: 
            if os.path.isdir(path):
                self.ENV = Environment(loader=FileSystemLoader(path))
            else:
                raise ValueError("template_path must dir")
        except Exception as e: 
            raise ValueError("template_path must dir") from e

    def renderTemplate(self, template_name: str, data: dict = None) -> str:
        data = data or {}
        temp = self.ENV.get_template(f"{template_name}.html")
        return temp.render(**data)

    def send(self, to: str, title: str, template_name: str, data: dict = None,
             email_from: str = None) -> bool:
        content = self.renderTemplate(template_name, data)
        print(content)
        msg = MIMEText(content, 'html', 'utf-8')
        msg['Subject'] = title
        msg['From'] = email_from or self.email_from
        msg['To'] = to
        print(msg.as_string())
        try:
            self.smtp.sendmail(email_from or self.email_from, to, msg.as_string())
            return True
        except smtplib.SMTPException as e:
            traceback.print_exc()
            return False

        

        
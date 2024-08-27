from apps.report.gen_report import BaseQuery
from apps.permission.models.user import Users
from utils.tools import list_to_tree


class Query(BaseQuery):
    def report_config(self):
        self.header = ["编号", "用户名", "昵称", "邮箱", "手机号码", "性别", "状态", "创建时间"]
        self.file_name = "用户信息"

    def instance_data(self):
        query = self.db.query(Users)

        filters = []
        # query = query.filter(Users.username.like("%" + self.query_params.get("username") + "%"))
        # query = query.filter(Users.nickname.like("%" + self.query_params.get("nickname") + "%"))
        if self.query_params.get("username"):
            filters.append(Users.username.like("%" + self.query_params.get("username") + "%"))
        if self.query_params.get("nickname"):
            filters.append(Users.nickname.like("%" + self.query_params.get("nickname") + "%"))
        if self.query_params.get("email"):
            filters.append(Users.email.like("%" + self.query_params.get("email") + "%"))
        if self.query_params.get("phone"):
            filters.append(Users.phone.like("%" + self.query_params.get("phone") + "%"))

        if self.query_params.get("status"):
            filters.append(Users.status == self.query_params.get("status"))
        if self.query_params.get("sex"):
            filters.append(Users.sex == self.query_params.get("sex"))

        rows = query.filter(*filters).all()
        data = []
        for row in rows:
            data_row = [
                row.id,
                row.username,
                row.nickname,
                row.email,
                row.phone,
                row.sex,
                row.status,
                row.created_time,
            ]
            data.append(data_row)
        return data

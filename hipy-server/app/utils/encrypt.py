import string
import uuid
import random


def get_uuid(res_type: str = 'str'):
    """
    生成uuid
    :param res_type:      :type str   返回类型, 默认str 
    """
    res_type = res_type.lower()
    obj = uuid.uuid4()
    if res_type.startswith('obj'):
        return obj
    elif res_type.startswith('h'):
        return obj.hex
    elif res_type.startswith('int'):
        return obj.int
    elif res_type.startswith('field'):
        return obj.fields
    else:
        return str(obj)



def get_random_string(length: int, number: bool = True, uppercase: bool = True, lowercase: bool = True) -> str:
    """
    获取随机字符串
    :param length:      :type int   字符串长度
    :param number:      :type bool  是否含有数字 default: True
    :param uppercase:   :type bool  是否含有大写英文字母 default: True
    :param lowercase:   :type bool  是否含有小写英文字母 default: True
    :return:            :type str   返回生成的随机字符串 default
    """
    if type(length) != int:
        raise TypeError("length must be int")
    scope = ""
    if number:
        scope += string.digits
    if uppercase:
        scope += string.ascii_uppercase
    if lowercase:
        scope += string.ascii_lowercase
    if scope:
        return ''.join(random.choice(scope) for _ in range(length))
    else:
        raise ValueError("number / uppercase / lowercase not all False")
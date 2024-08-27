from typing import List
from captcha.image import ImageCaptcha
import random
import base64

_NUM_WORDS = [
                 # '0', '1',   # 容易混淆 O 和 l
                 '2', '3', '4', '5', '6', '7', '8',  # '9',  # 容易混淆q
             ] * 3  # 数字*3 增加出现数字的概率

_UPPER_WORDS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',  # 'I',      # 容易与 l 和 1 混淆
    'J', 'K', 'L', 'M', 'N',  # 'O',    # 容易和 0 混淆
    'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',  # 'Z'  容易和 2 混淆
]

_LOWER_WORDS = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',  # 'l',  # 混淆 1，I
    'm', 'n',  # 'o',  # 混淆 0
    'p',  # 'q',  # 混淆 9
    'r', 's', 't', 'u', 'v', 'w', 'x', 'y',  # 'z', # 混淆 2
]

_OTHER_WORDS = [
                   '#', '%',
               ] * 5

WORDS = _NUM_WORDS + _UPPER_WORDS + _LOWER_WORDS + _OTHER_WORDS


def create_code(k: int, *, img_width: int = 100, img_height: int = 50, font_sizes: List[int] = None):
    if not font_sizes:
        font_sizes = [35, 30, 33]
    elif isinstance(font_sizes, int):
        font_sizes = [font_sizes]
    image = ImageCaptcha(width=img_width, height=img_height, font_sizes=font_sizes)
    codes = ''.join(random.choices(WORDS, k=k))
    captcha_img = image.generate(codes)
    return captcha_img.read(), codes


def create_base64_code(k: int, *, img_width: int = 100, img_height: int = 50, font_sizes: List[int] = None):
    captcha_img, codes = create_code(k, img_width=img_width, img_height=img_height, font_sizes=font_sizes)
    return "data:image/png;base64," + base64.b64encode(captcha_img).decode('utf-8'), codes


if __name__ == '__main__':
    print(create_base64_code(4))

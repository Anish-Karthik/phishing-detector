from bs4 import BeautifulSoup
from urllib.request import Request, urlopen
import re

req = Request("https://www.geeksforgeeks.org/extract-all-the-urls-from-the-webpage-using-python/")
html_page = urlopen(req)

soup = BeautifulSoup(html_page, "lxml")

links = []
for link in soup.findAll('a'):
    links.append(link.get('href'))
for link in links:
        print(link);


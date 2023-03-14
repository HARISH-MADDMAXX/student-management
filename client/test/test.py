from selenium import webdriver 
import time

from selenium.webdriver.chrome.options import Options
chrome_options = Options()
chrome_options.add_experimental_option("detach", True)
driver=webdriver.Chrome("C:\\Users\\HARISH R\\Downloads\\chromedriver_win32\\chromedriver.exe")
driver.maximize_window()

driver.get("http://localhost:3000/student")
driver.find_element("id","username").send_keys("muthulingam@gmail.com")
driver.find_element("id","password").send_keys("secret")
driver.find_element("id","submit").click()
time.sleep(5)
CONTENTS OF THIS FILE
---------------------
   
 * Introduction
 * Datasets
 * Limitations
 * References

 
INTRODUCTION
------------


Procedure:
1. Integrate your mobile device (phone/tablet) with the WiFi Network (refer to the Help page in the web application).
2. View the live stream through the Monitor page of the web application.
3. Run the model through PyCharm to predict the activity in the stream and classify it as either threat or not (positive or negative).
4. If the model identifies a threat, they will notify the administrator via a text message.
5. Through the Activity tab, the system adminstrator can view the activity logs.
6. In the Statistics tab,  the test data analytics can be viewed through means such as Confusion Matrix.
7. The Help tab guides the user to setup thier device as a webcam. 


 
DATASETS
------------
1. Knife Image Dataset: http://kt.agh.edu.pl/matiolanski/KnivesImagesDatabase/
-CCTV object detection with fuzzy classification and image enhancement, Andrzej MATIOLANSKI, Aleksandra MAKSIMOWA, Andrzej DZIECH, Multimedia Tools and Applications, 2015, pages 1-16, ISSN 1573-7721, doi:10.1007/s11042-015-2697-z 
Available at: http://link.springer.com/article/10.1007%2Fs11042-015-2697-z 

-Automated Detection of Firearms and Knives in a CCTV Image, Michal Grega, Andrzej MATIOLANSKI, Piotr Guzik, Mikolaj Leszczuk, Sensors, ISSN 1424-8220. — 2016 vol. 16 iss. 1 art. no. 47, s. 1–16.
Available at: http://www.mdpi.com/1424-8220/16/1/47/htm 

2. Gun Dataset
Internet Movie Firearms Dataset:
-Obtained over 500 images of guns in action
-http://www.imfdb.org/index.php?title=Category:Behind_the_Scenes_Image&filefrom=SPR+BTS+armorer+03.jpg#mw-category-media


 
LIMITATIONS
------------
1. Did not have enough resources in hardware to do quick modeling (CPU with only 8 GB in the laptops used)
2. Did not have server to conduct high performance streaming
3. Experienced some lag in streaming due to resource limitation

 
REFERENCES
------------
1. Stack overflow: https://stackoverflow.com/
2. Inception Model: https://tensorflow.rstudio.com/keras/reference/application_inception_v3.html
3. Automated Detection of Firearms and Knives in a CCTV Image (Michal Grega,* Andrzej Matiolanski, Piotr Guzik, and Mikolaj Leszczuk): https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4732080/#B43-sensors-16-00047
4. Tensorflow: https://www.tensorflow.org/api_docs/

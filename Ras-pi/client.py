data = {
  "images": [
    {
      "classifiers": [
        {
          "classifier_id": "DefaultCustomModel_1849095925",
          "name": "Default Custom Model",
          "classes": [
            {
              "class": "Nomask",
              "score": 0.891
            }
          ]
        }
      ],
      "image": "opencv.png"
    }
  ],
  "images_processed": 1,
  "custom_classes": 2
}

print(data['images'][0]['classifiers'][0]['classes'][0]['class'])
print(data['images'][0]['classifiers'][0]['classes'][0]['score'])
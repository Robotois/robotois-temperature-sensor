{
  "targets": [
    {
      "target_name": "TemperatureSensor",
      "sources": [
          "src/wrapper/TemperatureSensor.cpp",
          "src/wrapper/TempWrapper.cpp",
          "src/TemperatureSensor.cpp",
          "src/libraries/robotois-ADS1015/ADS1015.cpp",
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}

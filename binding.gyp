{
  "targets": [
    {
      "target_name": "TemperatureSensor",
      "sources": [ "src/Wrapper/TemperatureSensor.cpp","src/Wrapper/TempWrapper.cpp",
      "src/TemperatureSensor.cpp",
      "src/Libraries/robotois-ADS1015/ADS1015.cpp",
      "src/Libraries/robotois-timer/AccurateTiming.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}

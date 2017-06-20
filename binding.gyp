{
  "targets": [
    {
      "target_name": "TemperatureSensor",
      "sources": [ "src/Wrapper/TemperatureSensor.cpp","src/Wrapper/TempWrapper.cpp",
      "src/TemperatureSensor.cpp",
      "src/Libraries/ADS1015/ADS1015.cpp",
      "src/Libraries/Timer/AccurateTiming.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}

{
  "targets": [
    {
      "target_name": "TemperatureSensor",
      "sources": [ "TemperatureSensor.cpp","TempWrapper.cpp",
      "src/Modules/AnalogModules/TemperatureSensor.cpp",
      "src/Libraries/ADS1015/ADS1015.cpp",
      "src/Libraries/Timer/AccurateTiming.cpp"
      ],
      "libraries": ["-l bcm2835","-l rt"]
    }
  ]
}

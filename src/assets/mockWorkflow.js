export default [
  {
    "properties": {
      "Buffer length": "8192",
      "name": "File Reader",
      "Encoding": "UTF-8",
      "inputfile": "/home/david/input.txt",
      "Use GZIP": "false"
    },
    "moduleInstanceHashCode": 1764388695,
    "moduleCanonicalClassName": "modules.input_output.FileReaderModule",
    "serializableInputPortList": {},
    "serializableOutputPortList": {
      "output": {
        "instanceHashCode": 1346009876,
        "name": "output",
        "connectedPipesDestinationHashCodes": {
          "56550365": "modules.CharPipe"
        }
      }
    },
    "metadata": {
      "ypos": 11,
      "xpos": 32
    }
  },
  {
    "properties": {
      "output original string": "false",
      "string input delimiter regex": "\\R",
      "name": "Segment Joiner",
      "group output delimiter": "\\n",
      "reverse segmenting": "false",
      "segment output delimiter": "|",
      "string output delimiter": "\\n",
      "segment input delimiter regex": "\\|"
    },
    "moduleInstanceHashCode": 290433619,
    "moduleCanonicalClassName": "modules.segmentation.SegmentJoinerModule",
    "serializableInputPortList": {
      "input": {
        "instanceHashCode": 56550365,
        "name": "input",
        "connectedPipesDestinationHashCodes": {
          "1346009876": "modules.CharPipe"
        }
      }
    },
    "serializableOutputPortList": {
      "output": {
        "instanceHashCode": 591403986,
        "name": "output",
        "connectedPipesDestinationHashCodes": {
          "847960952": "modules.CharPipe",
          "829158630": "modules.CharPipe"
        }
      }
    },
    "metadata": {
      "ypos": 197,
      "xpos": 17
    }
  },
  {
    "properties": {
      "string input delimiter regex": "\\n",
      "CSV output delimiter": ";",
      "name": "Segment Matrix",
      "omit empty rows and cols": "false",
      "segment input delimiter regex": "\\|",
      "omit zero values": "true"
    },
    "moduleInstanceHashCode": 1486874744,
    "moduleCanonicalClassName": "modules.segmentation.SegmentMatrixModule",
    "serializableInputPortList": {
      "input": {
        "instanceHashCode": 847960952,
        "name": "input",
        "connectedPipesDestinationHashCodes": {
          "591403986": "modules.CharPipe"
        }
      }
    },
    "serializableOutputPortList": {
      "output": {
        "instanceHashCode": 1163897117,
        "name": "output",
        "connectedPipesDestinationHashCodes": {
          "47702592": "modules.CharPipe",
          "1717740783": "modules.CharPipe"
        }
      }
    },
    "metadata": {
      "ypos": 198,
      "xpos": 232
    }
  },
  {
    "properties": {
      "Operate on rows": "true",
      "operation": "XOR",
      "name": "Matrix Bitwise Operation Module",
      "Reflexive": "true",
      "Output separator": ";",
      "Input separator": ";"
    },
    "moduleInstanceHashCode": 956915883,
    "moduleCanonicalClassName": "modules.matrix.MatrixBitwiseOperationModule",
    "serializableInputPortList": {
      "Input Matrix": {
        "instanceHashCode": 1717740783,
        "name": "Input Matrix",
        "connectedPipesDestinationHashCodes": {
          "1163897117": "modules.CharPipe"
        }
      }
    },
    "serializableOutputPortList": {
      "Output Matrix": {
        "instanceHashCode": 1828059704,
        "name": "Output Matrix",
        "connectedPipesDestinationHashCodes": {
          "1423614458": "modules.CharPipe"
        }
      },
      "List Output": {
        "instanceHashCode": 669790802,
        "name": "List Output",
        "connectedPipesDestinationHashCodes": {}
      }
    },
    "metadata": {
      "ypos": 199,
      "xpos": 446
    }
  },
  {
    "properties": {
      "outputfile": "/tmp/single-split.txt",
      "Buffer length": "8192",
      "name": "File Writer",
      "Encoding": "UTF-8",
      "Use GZIP": "false"
    },
    "moduleInstanceHashCode": 1137025212,
    "moduleCanonicalClassName": "modules.input_output.FileWriterModule",
    "serializableInputPortList": {
      "input": {
        "instanceHashCode": 829158630,
        "name": "input",
        "connectedPipesDestinationHashCodes": {
          "591403986": "modules.CharPipe"
        }
      }
    },
    "serializableOutputPortList": {},
    "metadata": {
      "ypos": 310,
      "xpos": 19
    }
  },
  {
    "properties": {
      "outputfile": "/tmp/segment-matrix.csv",
      "Buffer length": "8192",
      "name": "File Writer",
      "Encoding": "UTF-8",
      "Use GZIP": "false"
    },
    "moduleInstanceHashCode": 267191010,
    "moduleCanonicalClassName": "modules.input_output.FileWriterModule",
    "serializableInputPortList": {
      "input": {
        "instanceHashCode": 47702592,
        "name": "input",
        "connectedPipesDestinationHashCodes": {
          "1163897117": "modules.CharPipe"
        }
      }
    },
    "serializableOutputPortList": {},
    "metadata": {
      "ypos": 305,
      "xpos": 232
    }
  },
  {
    "properties": {
      "outputfile": "/tmp/segment-matrix-xor-count.csv",
      "Buffer length": "8192",
      "name": "File Writer",
      "Encoding": "UTF-8",
      "Use GZIP": "false"
    },
    "moduleInstanceHashCode": 312883997,
    "moduleCanonicalClassName": "modules.input_output.FileWriterModule",
    "serializableInputPortList": {
      "input": {
        "instanceHashCode": 1423614458,
        "name": "input",
        "connectedPipesDestinationHashCodes": {
          "1828059704": "modules.CharPipe"
        }
      }
    },
    "serializableOutputPortList": {},
    "metadata": {
      "ypos": 308,
      "xpos": 452
    }
  }
]
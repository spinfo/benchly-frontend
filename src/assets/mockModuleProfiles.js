export default [
  {
    "name": "ASCIIGraph",
    "canonicalClassName": "modules.visualization.ASCIIGraph",
    "description": "Creates ASCII output with a visual representation of the node distribution within the input graph.",
    "category": "visualization",
    "propertyDescriptions": {
      "Biggest child uses parent symbol": "Has the biggest child of each node use that node\u0027s symbol (to visualize the flow of each path most used).",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "Biggest child uses parent symbol": "true",
      "name": "ASCIIGraph"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "JSON-encoded suffix trie.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "ASCII visualization.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Artificial Sequence Generator",
    "canonicalClassName": "modules.generators.artificialSeqs.CreateArtificialSeqs",
    "description": "Creates a randomly composed DNA sequences of defined length.",
    "category": "generators",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "Length of the randomly composed DNA sequence": "Length of the randomly composed DNA sequence"
    },
    "propertyDefaultValues": {
      "name": "Artificial Sequence Generator",
      "Length of the randomly composed DNA sequence": "1024"
    },
    "inputPorts": [],
    "outputPorts": [
      {
        "name": "output",
        "description": "Generated sequences.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "AtomicRangeSuffixTrieBuilder",
    "canonicalClassName": "modules.tree_building.treeBuilder.AtomicRangeSuffixTrieBuilder",
    "description": "Iterates over a raw and unsegmented string input, building a suffix trie from the data of limited range with each step. Keeps track of how often each node of the suffix trie gets triggered.",
    "category": "tree building",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "Maximum length of branches": "Define the maximum length of any branch of the trie. Set to -1 for no constraint",
      "Reverse the trie": "Reverse the building of the trie (results in a prefix trie)."
    },
    "propertyDefaultValues": {
      "name": "AtomicRangeSuffixTrieBuilder",
      "Maximum length of branches": "10",
      "Reverse the trie": "false"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Plain text character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "JSON-encoded suffix trie.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "BagsOfWords",
    "canonicalClassName": "modules.bag_of_words.BagsOfWordsModule",
    "description": "This module reads either\u003cbr/\u003e\u003col\u003e\u003cli\u003eA JSON representation of a GeneralisedSuffixTree.\u003cbr/\u003eIt then constructs bags of words from it. It assumes that the tree\u0027s pattern nrs stand in for sentence numbers and treats each node\u0027s label as a word.\u003c/li\u003e\u003cli\u003eA simple List of newline separated sentences.\u003cbr/\u003eIt then simply splits the words on whitespace.\u003c/li\u003e\u003c/ol\u003e\u003cbr/\u003eThe output in either case is a JSON-serialized TreeMap\u0026lt;Integer,TreeMap\u0026lt;String,Integer\u0026gt;\u0026gt; mapping sentence numbers to maps of \"words\" with a count in the sentence.",
    "category": "bag of words",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "BagsOfWords"
    },
    "inputPorts": [
      {
        "name": "GST",
        "description": "[text/json] Suffix Tree Representation (class: SuffixTreeRepresentation)",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "Simple labels",
        "description": "[text/plain] A newline separated List of labels.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "Simple",
        "description": "[text/plain] A newline separated List of sentences.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "BoW",
        "description": "[text/json] Bags of Words (class: TreeMap\u0026lt;Integer,TreeMap\u0026lt;String,Integer\u0026gt;\u0026gt;)",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "BagsOfWordsDistancesModule",
    "canonicalClassName": "modules.bag_of_words.BagsOfWordsDistancesModule",
    "description": "\u003cp\u003eModule to determine the distance between Bags of Words.\u003c/p\u003e\u003cp\u003eCurrently supports Levenshtein distance, i.e. output is the number of substitutions, deletions or additions of words that would be needed to transform one Bag of Words into another.\u003cp\u003e",
    "category": "bag of words",
    "propertyDescriptions": {
      "Normalize distance": "Divides each distance by it\u0027s possible maximum for the two BoWs.",
      "Filter on TF-IDF min": "When computing distances disregards words with tf-idf below this value. Disabled on \"0.0\"",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "Normalize distance": "false",
      "Filter on TF-IDF min": "0.8",
      "name": "BagsOfWordsDistancesModule"
    },
    "inputPorts": [
      {
        "name": "json",
        "description": "[text/json] TreeMap\u003cInteger,TreeMap\u003cString,Integer\u003e\u003e",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "json",
        "description": "[text/json] TreeMap\u003cInteger,TreeMap\u003cInteger,Float\u003e\u003e",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "BoW Type Matrix",
    "canonicalClassName": "modules.matrix.BowTypeMatrixModule",
    "description": "Creates a type-type matrix from Bag of Words data.",
    "category": "matrix",
    "propertyDescriptions": {
      "output delimiter": "String to insert as CSV delimiter (only applicable to CSV output).",
      "min IDF value": "Ignores all vectorfeatures with values smaller than the entered value. If no Filtering is wished, please enter 0. Is only used, when TFIDF is \u0027true\u0027.",
      "name": "The module instance\u0027s name",
      "apply TF-iDF": "Multiply the token values with their \u003ci\u003eInverse Document Frequencies\u003c/i\u003e before calculating the type sum [true|false].",
      "empty value": "String to insert as empty value into the output (only applicable to CSV output).",
      "output format": "Desired output format [csv|json]."
    },
    "propertyDefaultValues": {
      "output delimiter": ";",
      "min IDF value": "0",
      "name": "BoW Type Matrix",
      "apply TF-iDF": "false",
      "empty value": "0",
      "output format": "csv"
    },
    "inputPorts": [
      {
        "name": "BoW",
        "description": "JSON BoW data input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "Type Matrix",
        "description": "CSV Type Matrix output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Branch Length Grouping",
    "canonicalClassName": "modules.tree_properties.branchLengthGroups.BranchLengthGrouping",
    "description": "This module reads plain text dot format from I/O pipe.\u003c/br\u003eIt parses form the obtained information inner nodes, leaf nodes,\u003c/br\u003eedges and suffix links.\u003c/br\u003eThis module scans the inner nodes exclusively and adds up the length\u003c/br\u003eof the branches depending on a pre-defined threshold for a minimum\u003c/br\u003ebranch length. For this purpose the module follows suffix-links bottom-up\u003c/br\u003ea previously constructed generalized suffix tree.\u003c/br\u003e",
    "category": "tree properties",
    "propertyDescriptions": {
      "Minimal branch length allowed": "Minimal branch length for edges between nodes needed.\u003c/br\u003eThis determines the stop during the search(es).",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "Minimal branch length allowed": "2",
      "name": "Branch Length Grouping"
    },
    "inputPorts": [
      {
        "name": "dot input",
        "description": "[dot format] Dot output from the\u003c/br\u003eGST builder module.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "xml input",
        "description": "[xml format] Xml output from the\u003c/br\u003eGST builder module.",
        "supportedPipes": [
          "modules.BytePipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "[tsv]\u003c/br\u003eTable format",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Buffer Module",
    "canonicalClassName": "modules.input_output.BufferModule",
    "description": "Stores input until the pipe closes and only then writes it to the output.",
    "category": "input output",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "Buffer Module"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Plain text character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Plain text character output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Burrows-Wheeler Transform",
    "canonicalClassName": "modules.basic_text_processing.burrows_wheeler.BurrowsWheelerTransformationModule",
    "description": "Performs the Burrows-Wheeler Transformation (see https://en.wikipedia.org/wiki/Burrows-Wheeler_transform)",
    "category": "basic text processing",
    "propertyDescriptions": {
      "output delimiter": "String to insert as string delimiter into the output (will be unescaped).",
      "input delimiter regex": "Regular expression to use as string delimiter.",
      "string end char": "String end character; needed for reverse transformation.",
      "name": "The module instance\u0027s name",
      "reverse transform": "Conduct reverse Burrows-Wheeler Transformation [true|false]."
    },
    "propertyDefaultValues": {
      "output delimiter": "\\n",
      "input delimiter regex": "\\R+",
      "string end char": "$",
      "name": "Burrows-Wheeler Transform",
      "reverse transform": "false"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "CSV to GEXF converter",
    "canonicalClassName": "modules.format_conversion.CSV2GEXFModule",
    "description": "Converts a matrix with numerical values into a GEXF graph.",
    "category": "format conversion",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "CSV input delimiter": "Regular expression to use as field delimiter for CSV input",
      "Edge designator": "Designator for edges in the GEXF graph (use to describe type of relationship between connected nodes)"
    },
    "propertyDefaultValues": {
      "name": "CSV to GEXF converter",
      "CSV input delimiter": ";",
      "Edge designator": "resembles"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "CSV input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "GEXF graph.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Case Changer",
    "canonicalClassName": "modules.basic_text_processing.CaseChangerModule",
    "description": "Changes the input to uppercase or lowercase.",
    "category": "basic text processing",
    "propertyDescriptions": {
      "Locale": "Tag of the locale to use for the case change. Accepts a IETF BCP 47 language tag string (can be as simple as \u0027en-US\u0027 or \u0027de-DE\u0027; for details, see https://tools.ietf.org/html/bcp47).",
      "Change to": "Case to change the input to. Accepted values are \u0027lower[case]\u0027 or \u0027upper[case]\u0027.",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "Locale": "en-US",
      "Change to": "lowercase",
      "name": "Case Changer"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Plain text character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Plain text character output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "CloudReader",
    "canonicalClassName": "modules.input_output.cloud_storage.CloudReaderModule",
    "description": "Reads contents from a remote object provider (e.g. aws-s3, open-stack, ...) via the jClouds BlobStore API.",
    "category": "input output",
    "propertyDescriptions": {
      "Salt": "A salt to use in decryption when the credential is given in encrypted form.",
      "Context identifier": "A context identifier supported by jClouds, tested for: \u0027aws-s3\u0027, \u0027b2\u0027, \u0027openstack-swift\u0027.",
      "Credential": "The credential used to authenticate the identity.",
      "Container": "The container name to use, e.g. an s3 bucket name.",
      "Endpoint": "An endpoint to contact the Storage provider on. Needed for \u0027openstack-swift\u0027.",
      "name": "The module instance\u0027s name",
      "Encoding": "An encoding to use when reading/writing the file.",
      "Identity": "The identity to connect as, e.g. a username.",
      "File": "The file to read from or write to."
    },
    "propertyDefaultValues": {
      "Salt": "",
      "Context identifier": "",
      "Credential": "",
      "Container": "",
      "Endpoint": "",
      "name": "CloudReader",
      "Encoding": "UTF-8",
      "Identity": "",
      "File": ""
    },
    "inputPorts": [],
    "outputPorts": [
      {
        "name": "output",
        "description": "Byte or character output.",
        "supportedPipes": [
          "modules.CharPipe",
          "modules.BytePipe"
        ]
      }
    ]
  },
  {
    "name": "CloudWriter",
    "canonicalClassName": "modules.input_output.cloud_storage.CloudWriterModule",
    "description": "Writes the input to a remote object provider (e.g. aws-s3, open-stack-swift, ...) via the jClouds BlobStore API.",
    "category": "input output",
    "propertyDescriptions": {
      "Salt": "A salt to use in decryption when the credential is given in encrypted form.",
      "Context identifier": "A context identifier supported by jClouds, tested for: \u0027aws-s3\u0027, \u0027b2\u0027, \u0027openstack-swift\u0027.",
      "Credential": "The credential used to authenticate the identity.",
      "Container": "The container name to use, e.g. an s3 bucket name.",
      "Endpoint": "An endpoint to contact the Storage provider on. Needed for \u0027openstack-swift\u0027.",
      "name": "The module instance\u0027s name",
      "Encoding": "An encoding to use when reading/writing the file.",
      "Identity": "The identity to connect as, e.g. a username.",
      "File": "The file to read from or write to."
    },
    "propertyDefaultValues": {
      "Salt": "",
      "Context identifier": "",
      "Credential": "",
      "Container": "",
      "Endpoint": "",
      "name": "CloudWriter",
      "Encoding": "UTF-8",
      "Identity": "",
      "File": ""
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Byte or character input.",
        "supportedPipes": [
          "modules.CharPipe",
          "modules.BytePipe"
        ]
      }
    ],
    "outputPorts": []
  },
  {
    "name": "ColourGraph",
    "canonicalClassName": "modules.visualization.ColourGraph",
    "description": "Creates an image file a with visual representation of the node distribution within the input graph.",
    "category": "visualization",
    "propertyDescriptions": {
      "Image width": "Width of the output image in pixels.",
      "Image height": "Height of the output image in pixels.",
      "name": "The module instance\u0027s name",
      "Pixel per tree level": "Amount of pixels used for each tree level.",
      "Schwellwert fuer Gleichverteilung": "Schwellwert fuer Gleichverteilungsfaktor, oberhalb dessen Knoten ausgeblendet werden (0-1 [double]; 0 blendet alle aus, 1 keine).",
      "Ungleichverteilungen im Baum markieren": "Berechnet den Faktor eines Knotens, der anzeigt, wie gleich dessen Kinder verteilt sind (0\u003eX\u003e\u003d1; 1 bed. absolut gleich verteilt).",
      "Output file": "Specifies the location of the output file (PNG or JPEG).",
      "Markierungsart fuer Ungleichverteilung": "Legt fest, wie die Ungleichverteilung markiert wird (alpha|rot|alpha+rot|keine)."
    },
    "propertyDefaultValues": {
      "Image width": "640",
      "Image height": "480",
      "name": "ColourGraph",
      "Pixel per tree level": "10",
      "Schwellwert fuer Gleichverteilung": "1.0",
      "Ungleichverteilungen im Baum markieren": "false",
      "Output file": "/home/david/exp_20180325-001_colourgraph.png",
      "Markierungsart fuer Ungleichverteilung": "alpha"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "JSON-encoded suffix trie.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": []
  },
  {
    "name": "Comparison Module",
    "canonicalClassName": "modules.basic_text_processing.ComparisonModule",
    "description": "Module reads from two input ports and outputs 1) lines only in the first input, 2) lines only in the second input, 3) lines in both inputs.",
    "category": "basic text processing",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "Separator": "A separator to split input on. Defaults to newlines."
    },
    "propertyDefaultValues": {
      "name": "Comparison Module",
      "Separator": "\r\n|\n|\r"
    },
    "inputPorts": [
      {
        "name": "input 2",
        "description": "the second input",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "input 1",
        "description": "the first input",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "in 2nd only",
        "description": "Lines exclusive to input 2",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "in both",
        "description": "Lines occurring in both inputs",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "in 1st only",
        "description": "Lines exclusive to input 1",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Distance Matrix",
    "canonicalClassName": "modules.matrix.distanceModule.DistanceMatrixModule",
    "description": "Creates a distance-matrix from any input matrix.",
    "category": "matrix",
    "propertyDescriptions": {
      "output delimiter": "String to insert as CSV delimiter (only applicable to CSV output).",
      "name": "The module instance\u0027s name",
      "input delimiter": "Input matrix\u0027 delimiter",
      "distance type": "Two possible distance types: \"ED\" (Euclidean distance), \"CD\" (Cosine Distance) \"CS\" (Cosine similarity)"
    },
    "propertyDefaultValues": {
      "output delimiter": ";",
      "name": "Distance Matrix",
      "input delimiter": ";",
      "distance type": "ED"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "[text/csv] A csv representation of a NamedFieldMatrix to cluster",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "CSV Type Matrix output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Dot2GST converter",
    "canonicalClassName": "modules.format_conversion.dot2tree.Dot2TreeController",
    "description": "This module converts dot format from a (generalized) suffix tree into a data structure\u003c/br\u003eallowes tree walking and tree structure analysis.",
    "category": "format conversion",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "Dot2GST converter"
    },
    "inputPorts": [
      {
        "name": "dot input",
        "description": "[dot format] Dot output from the\u003c/br\u003eGST builder module.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "xml input",
        "description": "[xml format] Xml output from the\u003c/br\u003eGST builder module.",
        "supportedPipes": [
          "modules.BytePipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "[byte/binary or JSON]\u003c/br\u003eData structure representing a (generalized) suffix tree",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Eliminate Opposing Matrix Values",
    "canonicalClassName": "modules.matrix.MatrixEliminateOppositionalValuesModule",
    "description": "Eliminates matrix values that stand in opposition based on the specified column sums (columns with larger sums are given precedence over those with smaller ones).",
    "category": "matrix",
    "propertyDescriptions": {
      "output delimiter": "String to insert as segmentation delimiter into the output.",
      "input delimiter regex": "Regular expression to use as segmentation delimiter for CSV fields.",
      "name": "The module instance\u0027s name",
      "zero value": "String to insert as zero value into the output, replacing an eliminated row/column-value."
    },
    "propertyDefaultValues": {
      "output delimiter": ";",
      "input delimiter regex": "[\\,;]",
      "name": "Eliminate Opposing Matrix Values",
      "zero value": ""
    },
    "inputPorts": [
      {
        "name": "column sums",
        "description": "CSV column sums input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "matrix",
        "description": "CSV matrix input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "CSV output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Example Gson Deserialization Module",
    "canonicalClassName": "modules.examples.ExampleGsonDeserialization",
    "description": "Example Module: Deserializing a test string in JSON format.\u003cbr/\u003e Output is plain text.",
    "category": "examples",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "Example Gson Deserialization Module"
    },
    "inputPorts": [
      {
        "name": "JSON",
        "description": "serialized JSON input",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "String",
        "description": "deserialized string output",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Example Gson Serialization Module",
    "canonicalClassName": "modules.examples.ExampleGsonSerialization",
    "description": "Example Module: Serializing a plain test string.\u003cbr/\u003e Output is JSON format.",
    "category": "examples",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "Example Gson Serialization Module"
    },
    "inputPorts": [
      {
        "name": "string",
        "description": "plain text input",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "JSON",
        "description": "serialized JSON output",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Example Module",
    "canonicalClassName": "modules.examples.ExampleModule",
    "description": "\u003cp\u003eSegments two inputs and entwines them.\u003c/p\u003e\u003cp\u003eAmong other things, you can use it\u003cbr/\u003e\u003cul\u003e\u003cli\u003eas a template to base your own modules on,\u003c/li\u003e\u003cli\u003eto review basic practices, like I/O,\u003c/li\u003e\u003cli\u003eand to get an overview of the standard implementations needed.\u003c/li\u003e\u003c/ul\u003e\u003c/p\u003e",
    "category": "examples",
    "propertyDescriptions": {
      "delimiter out": "String to insert as segmentation delimiter into the output",
      "name": "The module instance\u0027s name",
      "delimiter A": "Regular expression to use as segmentation delimiter for input A",
      "delimiter B": "Regular expression to use as segmentation delimiter for input B"
    },
    "propertyDefaultValues": {
      "delimiter out": "\t",
      "name": "Example Module",
      "delimiter A": "[\\s]+",
      "delimiter B": "[\\s]+"
    },
    "inputPorts": [
      {
        "name": "input B",
        "description": "Plain text character input B.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "input A",
        "description": "Plain text character input A.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "entwined",
        "description": "Plain text character output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "capitals",
        "description": "Plain text character output (all uppercase).",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "ExtensibleTreeNode to CSV converter",
    "canonicalClassName": "modules.format_conversion.ExtensibleTreeNode2CSVModule",
    "description": "Converts trees based on the ExtensibleTreeNode into a CSV table.",
    "category": "format conversion",
    "propertyDescriptions": {
      "calculate probabilities": "Calculate node transistion probabilities (else, a simple binary value will be used on output). [true/false]",
      "name": "The module instance\u0027s name",
      "CSV delimiter": "String to use as CSV field delimiter."
    },
    "propertyDefaultValues": {
      "calculate probabilities": "true",
      "name": "ExtensibleTreeNode to CSV converter",
      "CSV delimiter": ";"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "ExtensibleTreeNode tree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "GEXF graph.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "ExtensibleTreeNode to GEXF converter",
    "canonicalClassName": "modules.format_conversion.ExtensibleTreeNode2GEXFModule",
    "description": "Converts trees based on the ExtensibleTreeNode into a GEXF graph.",
    "category": "format conversion",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "ExtensibleTreeNode to GEXF converter"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "ExtensibleTreeNode tree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "GEXF graph.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Filter Module",
    "canonicalClassName": "modules.basic_text_processing.FilterModule",
    "description": "Filters out strings not matching the specified minimum or maximum length.",
    "category": "basic text processing",
    "propertyDescriptions": {
      "minlength": "minimum length of ...",
      "maxlength": "maximum length of ...",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "minlength": "1",
      "maxlength": "30",
      "name": "Filter Module"
    },
    "inputPorts": [
      {
        "name": "input1",
        "description": "Plain text character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output-normal",
        "description": "Plain text character output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "GC adjusted Sequence Generator",
    "canonicalClassName": "modules.generators.artificialSeqs.CreateArtificialSeqsContent",
    "description": "Creates a randomly composed DNA sequences of defined length. Allows for specification of the amount of Letters \u0027C\u0027 and \u0027G\u0027, in the form of a decimal probability.",
    "category": "generators",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "Amount of letters \u0027C\u0027 and \u0027G\u0027": "Amount of letters \u0027C\u0027 and \u0027G\u0027",
      "Length of the randomly composed DNA sequence": "Length of the randomly composed DNA sequence"
    },
    "propertyDefaultValues": {
      "name": "GC adjusted Sequence Generator",
      "Amount of letters \u0027C\u0027 and \u0027G\u0027": "0.5",
      "Length of the randomly composed DNA sequence": "1024"
    },
    "inputPorts": [],
    "outputPorts": [
      {
        "name": "output",
        "description": "Generated sequences.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "GEXF Filter",
    "canonicalClassName": "modules.graph_editing.GexfFilterModule",
    "description": "Filters GEXF data according to the specified parameters. Expects nodes to have the attribute \u0027nodeCounter\u0027 indicating the amount of tokens associated.",
    "category": "graph editing",
    "propertyDescriptions": {
      "minimum similarity": "Minimum similarity value an edge must have to be kept in the graph.",
      "name": "The module instance\u0027s name",
      "minimum amount of tokens": "Minimum amount of tokens a type must have to be kept in the graph."
    },
    "propertyDefaultValues": {
      "minimum similarity": "0.1",
      "name": "GEXF Filter",
      "minimum amount of tokens": "2"
    },
    "inputPorts": [
      {
        "name": "GEXF graph",
        "description": "GEXF graph. Nodes must have the attribute \u0027nodeCounter\u0027.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "GEXF graph",
        "description": "GEXF graph (filtered).",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "GeneralisedSuffixTreeModule",
    "canonicalClassName": "modules.tree_building.suffixTreeModuleWrapper.GeneralisedSuffixTreeModule",
    "description": "Module Rreads from KWIP modules output into a suffix tree. Constructs a representation of that tree, that can be used as input for clustering.",
    "category": "tree building",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "GeneralisedSuffixTreeModule"
    },
    "inputPorts": [
      {
        "name": "plain",
        "description": "[text/plain] Takes a plaintext representation of the KWIP result.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "type context nrs",
        "description": "[text/plain] Takes a list of numbers of available type contexts from the KWIP result",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "edge segments",
        "description": "For each input text the output is that path in the tree split into it\u0027s edges.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "xml",
        "description": "[bytestream] An xml representation of the tree build, suitbale for clustering.",
        "supportedPipes": [
          "modules.BytePipe"
        ]
      },
      {
        "name": "json",
        "description": "[text/json] A json representation of the tree build, suitable for clustering.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "label list",
        "description": "[text/plain] A list of labels separated by newline",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "label data",
        "description": "[text/csv] Prints a csv table with label information.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "tn",
        "description": "[bytestream] A forTN representation of the tree build, suitable for clustering.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "dot file",
        "description": "Prints a graphical representation of the tree as a graphviz .dot file.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "GeneralisedSuffixTreesMorphologyModule",
    "canonicalClassName": "modules.tree_building.suffixTreeModuleWrapper.GeneralizedSuffixTreesMorphologyModule",
    "description": "Module reads two inputs, one reversed into suffix trees.",
    "category": "tree building",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "GeneralisedSuffixTreesMorphologyModule"
    },
    "inputPorts": [
      {
        "name": "plain",
        "description": "First character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "reversed",
        "description": "Reversed character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "[text/plain] Takes a plaintext representation of the result.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "HAL advanced module",
    "canonicalClassName": "modules.hal.HalAdvancedModule",
    "description": "Implementation of the HAL (Hyperspace Analogue to Language) method, used to find similarities in context, modified to keep track of relative context position and quantity.",
    "category": "hal",
    "propertyDescriptions": {
      "cooccurrency separator": "Separator for the cooccurrency position numbers",
      "name": "The module instance\u0027s name",
      "window size": "Size of the sliding window (default: 5)",
      "field separator": "Separator for the CSV fields"
    },
    "propertyDefaultValues": {
      "cooccurrency separator": ",",
      "name": "HAL advanced module",
      "window size": "5",
      "field separator": "\t\t"
    },
    "inputPorts": [
      {
        "name": "text input",
        "description": "Plain text character input, one segment per line.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "csv output",
        "description": "CSV tabular output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Join Module",
    "canonicalClassName": "modules.input_output.JoinModule",
    "description": "Module to join the character output of two modules.",
    "category": "input output",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "Join Module"
    },
    "inputPorts": [
      {
        "name": "Input 2",
        "description": "Second character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "Input 1",
        "description": "First character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "Output",
        "description": "Combined character output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "KWIP Module",
    "canonicalClassName": "modules.kwip.KeyWordInPhraseModule",
    "description": "KeyWord In Phrase Module.",
    "category": "kwip",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "KWIP Module"
    },
    "inputPorts": [
      {
        "name": "plain",
        "description": "[text/plain] Input for preprocessed plaintext.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "types",
        "description": "[text/plain] Outputs a line-by-line list of types.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "plain",
        "description": "[text/plain] Outputs a plaintext representation of the KWIP result (supports char and byte output).",
        "supportedPipes": [
          "modules.CharPipe",
          "modules.BytePipe"
        ]
      },
      {
        "name": "xml",
        "description": "[text/xml] Outputs an XML representation of the KWIP result (supports char and byte output).",
        "supportedPipes": [
          "modules.CharPipe",
          "modules.BytePipe"
        ]
      },
      {
        "name": "html",
        "description": "[text/html] Outputs an HTML representation of the KWIP result.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "units",
        "description": "[text/plain] Outputs a line-by-line list of units.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Kwip BoW Matrix",
    "canonicalClassName": "modules.kwip.KwipBowMatrixModule",
    "description": "Constructs a matrix from Kwip and BoW results.",
    "category": "kwip",
    "propertyDescriptions": {
      "omit zero values": "Omit zero values in output [true/false]",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "omit zero values": "false",
      "name": "Kwip BoW Matrix"
    },
    "inputPorts": [
      {
        "name": "kwip-units",
        "description": "Kwip units [plain text].",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "kwip-types",
        "description": "Kwip types [plain text].",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "bow",
        "description": "Bag of Words [json].",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "matrix",
        "description": "Matrix output [csv].",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "LFGroup Building Module",
    "canonicalClassName": "modules.lfgroups.LFGroupBuildingModule",
    "description": "Takes a successor matrix and a list from the matrix bitwise operation module and forms lexical-functional groups out of the matrix\u0027 entries.",
    "category": "experimental",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "output empty lexical groups": "A boolean value. Whether to output gorups with no or only the empty (i.e. \"\") lexical",
      "Pair list cutoff value": "At or below which value reading of the pair list should stop.",
      "csv delimiter": "Delimiter of the input csv cells."
    },
    "propertyDefaultValues": {
      "name": "LFGroup Building Module",
      "output empty lexical groups": "false",
      "Pair list cutoff value": "5",
      "csv delimiter": ";"
    },
    "inputPorts": [
      {
        "name": "List of Pairs",
        "description": "A list of pairs output by the MatrixBitwiseOperation Module.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "Successor Matrix",
        "description": "A successors matrix from the Segment Matrix module",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "Test Output",
        "description": "For now just a log output of the groups created",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "LabelDataMergeModule",
    "canonicalClassName": "modules.tree_editing.LabelDataMergeModule",
    "description": "Merges two outputs of label data generated by the Generalised Suffix Tree Module, assumes that the labels in one input have been reversed.",
    "category": "tree editing",
    "propertyDescriptions": {
      "Blank Trimming": "Blanks can be ignored in direction of reading (\"FOLLOWING\", default) or generally (\"ALL\") or not at all (\"NONE\").",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "Blank Trimming": "FOLLOWING",
      "name": "LabelDataMergeModule"
    },
    "inputPorts": [
      {
        "name": "labels",
        "description": "[text/csv] Csv rows describing GstLabelData objects.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "labels reversed",
        "description": "[text/csv] Csv rows describing GstLabelData objects.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "merged label data",
        "description": "[text/csv] Csv rows describing the merged output of the two inputs.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Markov Clustering Module",
    "canonicalClassName": "modules.matrix.MclModule",
    "description": "Takes a matrix and runs a fixed number of iterations of markov clustering on it.",
    "category": "matrix",
    "propertyDescriptions": {
      "r": "Exponent in the inflation step, double \u003e\u003d 1.",
      "name": "The module instance\u0027s name",
      "l": "Amount of matrix multiplications per iteration, int \u003e\u003d 1.",
      "iterations": "How often to iterate the inflation and deflation steps.",
      "csv delimiter": "Delimiter of the input csv cells."
    },
    "propertyDefaultValues": {
      "r": "2.0",
      "name": "Markov Clustering Module",
      "l": "2",
      "iterations": "1000",
      "csv delimiter": ";"
    },
    "inputPorts": [
      {
        "name": "input matrix",
        "description": "[text/csv] (Named Field) Matrix to cluster. NOTE: x and y dimensions of the matrix must agree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output matrix",
        "description": "[text/csv] Matrix clustered.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Matrix Bitwise Operation Module",
    "canonicalClassName": "modules.matrix.MatrixBitwiseOperationModule",
    "description": "Module interprets either rows or columns of an input matrix as binary bitsets and performs symmetrical operations (AND, OR, XOR) on these bitsets. Output is again a matrix showing how many bits are set for each combination of rows/columns after the operation is performed.",
    "category": "matrix",
    "propertyDescriptions": {
      "Output separator": "Which Output separator to use for the csv table output.",
      "Input separator": "Which input separator to use for the input csv table.",
      "name": "The module instance\u0027s name",
      "Reflexive": "Whether the operation should be applied to a row/col with itself.",
      "operation": "Which operation to perform, one of: AND, OR, XOR.",
      "Operate on rows": "Whether to operate on rows (true) or columns (false)."
    },
    "propertyDefaultValues": {
      "Output separator": ";",
      "Input separator": ";",
      "name": "Matrix Bitwise Operation Module",
      "Reflexive": "false",
      "operation": "AND",
      "Operate on rows": "true"
    },
    "inputPorts": [
      {
        "name": "Input Matrix",
        "description": "[text/csv] An input csv table. Header row and first column are expected to contain Strings as labels. All other fields are assumed to be blank or contain numerical values.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "Input Competition",
        "description": "Competition entries \u0027;\u0027 separated",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "Output Matrix",
        "description": "[text/csv] A symmetrical csv table mapping row/column headings to each other and containing the amounts of bits sets after the the operation specified was applied.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "List Output",
        "description": "[text/plain] A list of row/column mappings with the amount of bits set after the operation was applied, sorted by that count.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Matrix Column Sum",
    "canonicalClassName": "modules.matrix.MatrixColumnSumModule",
    "description": "Calculates the sum of all numerical values for each column of a given matrix. Outputs a linebreak-separated list of name-sum-pairs (in the same order as the columns were).",
    "category": "matrix",
    "propertyDescriptions": {
      "output delimiter": "String to insert as segmentation delimiter into the output name-sum-pairs.",
      "input delimiter regex": "Regular expression to use as segmentation delimiter for CSV input.",
      "input has header line": "First line of input is header line [true/false].",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "output delimiter": ";",
      "input delimiter regex": "[\\,;]",
      "input has header line": "false",
      "name": "Matrix Column Sum"
    },
    "inputPorts": [
      {
        "name": "csv input",
        "description": "CSV input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "CSV output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Matrix Filter",
    "canonicalClassName": "modules.matrix.MatrixFilterModule",
    "description": "Filters the input CSV matrix according to the specified regular expression (nonmatching elements are eliminated).",
    "category": "matrix",
    "propertyDescriptions": {
      "csv field delimiter": "CSV field delimiter [string].",
      "name": "The module instance\u0027s name",
      "match regex": "Regex that describes a positive match."
    },
    "propertyDefaultValues": {
      "csv field delimiter": ";",
      "name": "Matrix Filter",
      "match regex": "[^0]+"
    },
    "inputPorts": [
      {
        "name": "csv input",
        "description": "CSV input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "csv output",
        "description": "CSV output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Matrix Row/Col Pair Extractor",
    "canonicalClassName": "modules.matrix.MatrixRowColPairExtractorModule",
    "description": "Lets you specify a regex and extracts every row/column combination that has a matching value.",
    "category": "matrix",
    "propertyDescriptions": {
      "input delimiter regex": "Regular expression to use as segmentation delimiter for CSV input.",
      "output delimiter (outer)": "String to insert as segmentation delimiter between the output row-column-pairs (escaped values will be unescaped).",
      "name": "The module instance\u0027s name",
      "output delimiter (inner)": "String to insert as segmentation delimiter between row- and column-values (escaped values will be unescaped).",
      "match regex": "Regex that describes a positive match."
    },
    "propertyDefaultValues": {
      "input delimiter regex": "[\\,;]",
      "output delimiter (outer)": "\\n",
      "name": "Matrix Row/Col Pair Extractor",
      "output delimiter (inner)": "|",
      "match regex": "[^0]+"
    },
    "inputPorts": [
      {
        "name": "csv input",
        "description": "CSV input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "text output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "MatrixValuesExpressionApplyModule",
    "canonicalClassName": "modules.matrix.MatrixValuesExpressionApplyModule",
    "description": "Evaluates a JavaScript expression on every cell of the input matrix and outputs a new matrix containing the altered values.",
    "category": "matrix",
    "propertyDescriptions": {
      "expression": "An expression to evaluate on each matrix cell. Use \u0027VAL\u0027 to refer to the cell value. Expression has to result in a result of class Double.",
      "name": "The module instance\u0027s name",
      "csv delimiter": "The csv delimiter used in input and output."
    },
    "propertyDefaultValues": {
      "expression": "(VAL !\u003d 0 ? 1.0 : 0.0)",
      "name": "MatrixValuesExpressionApplyModule",
      "csv delimiter": ";"
    },
    "inputPorts": [
      {
        "name": "Matrix input",
        "description": "[text/csv] A NamedFieldMatrix to evaluate.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "Matrix output",
        "description": "[text/csv] the evaluated NamedFieldMatrix",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "MatrixVectorSortModule",
    "canonicalClassName": "modules.matrix.MatrixVectorSortModule",
    "description": "Sorts a type-type matrix.",
    "category": "matrix",
    "propertyDescriptions": {
      "output delimiter": "String to insert as CSV delimiter (only applicable to CSV output).",
      "exclude zeros": "Exclude zero values",
      "reverse order": "Sort reverse order",
      "name": "The module instance\u0027s name",
      "input delimiter": "Delimiter of input csv",
      "output format": "Desired output format [csv|json]."
    },
    "propertyDefaultValues": {
      "output delimiter": ";",
      "exclude zeros": "true",
      "reverse order": "false",
      "name": "MatrixVectorSortModule",
      "input delimiter": ";",
      "output format": "csv"
    },
    "inputPorts": [
      {
        "name": "Type Matrix",
        "description": "CSV Type Matrix input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "Type Matrix",
        "description": "(Headerless) CSV Type Matrix output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Minkowski Distance Matrix",
    "canonicalClassName": "modules.clustering.minkowskiDistance.MinkowskiDistanceMatrixModule",
    "description": "Calculates the minkowski distances for the specified Map of Sets.",
    "category": "clustering",
    "propertyDescriptions": {
      "csv output delimiter": "String to use as segmentation delimiter for CSV output (will be unescaped).",
      "csv empty value": "String to insert as empty value into the output (only applicable to CSV output).",
      "input format": "Format of input [json|csv].",
      "name": "The module instance\u0027s name",
      "ouput format": "Format of output [json|csv].",
      "csv input delimiter regex": "Regular expression to use as segmentation delimiter for CSV input."
    },
    "propertyDefaultValues": {
      "csv output delimiter": ";",
      "csv empty value": "0",
      "input format": "csv",
      "name": "Minkowski Distance Matrix",
      "ouput format": "csv",
      "csv input delimiter regex": "[\\,;]"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "CSV or JSON formatted two-dimensional matrix (Map\u0026lt;String,Set\u0026lt;Double\u0026gt;\u0026gt;).",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "CSV or JSON formatted distance matrix output (Map\u0026lt;String,Map\u0026lt;String,Double\u0026gt;\u0026gt;).",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Morphology Check Module",
    "canonicalClassName": "modules.morphology.MorphologyCheckModule",
    "description": "A module to check groups of comma separated morphemes (one group per line, comma separated) against groups of correct morphemes (one group per line, comma separated, optionally starting with a label followed by \u0027:\u0027)",
    "category": "morphology",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "Morphology Check Module"
    },
    "inputPorts": [
      {
        "name": "Morpheme Candidate groups",
        "description": "groups of morpheme candidates (one group per line, comma separated)",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "Correct Morpheme Groups",
        "description": "groups of correct morphemes to check against (one group per line, comma separated, optionally starting with a label followed by \u0027:\u0027)",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "An evaluation of the morpheme candidates group, one evaluation per candidate input line.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Motif Detection",
    "canonicalClassName": "modules.tree_properties.motifDetection.MotifDetectionController",
    "description": "This module transverses a Generalized Suffix Tree (GST) bottom up\u003cbr\u003eand detects nodes which are linked by suffix-links to one-another. \u003cbr\u003eSuch nodes which include a common starting edge (constant identical edge) and ...\u003cbr\u003e\u003cb\u003eRequirements:\u003c/b\u003e\u003cbr\u003e\u003cem\u003epending...\u003c/em\u003e",
    "category": "tree properties",
    "propertyDescriptions": {
      "Maximum number of trials": "Maximal tries allowed to find linked parents with alpha edge.",
      "Minimum length for alpha": "Minimal length for identical string alpha allowed.",
      "name": "The module instance\u0027s name",
      "Minim length for delta": "Minimal length for identical string delta allowed."
    },
    "propertyDefaultValues": {
      "Maximum number of trials": "16",
      "Minimum length for alpha": "3",
      "name": "Motif Detection",
      "Minim length for delta": "2"
    },
    "inputPorts": [
      {
        "name": "dot input",
        "description": "\u003cb\u003e[dot format]\u003c/b\u003e Dot output from the\u003cbr\u003eGST builder module.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "xml input",
        "description": "\u003cb\u003e[xml format]\u003c/b\u003e Xml output from the\u003cbr\u003eGST builder module.",
        "supportedPipes": [
          "modules.BytePipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "\u003cb\u003e[tsv]\u003c/b\u003e Table format",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Named Field Matrix Hamming distance",
    "canonicalClassName": "modules.matrix.MatrixOperations",
    "description": "\u003ch1\u003eNamed Field Matrix Hamming distance\u003c/h1\u003e\u003cp\u003eThis module reads a plain Named Field Matrix (csv, tsv etc.)and calculates the Hamming distance row wise.\u003c/p\u003e",
    "category": "matrix",
    "propertyDescriptions": {
      "Delimiter used for the output": "\u003cp\u003eSpecifies the delimiter used in the CSV\u003cbr /\u003etable for the output file.\u003c/p\u003e",
      "name": "The module instance\u0027s name",
      "Delimiter character": "ASCII character used to delimit each column."
    },
    "propertyDefaultValues": {
      "Delimiter used for the output": ";",
      "name": "Named Field Matrix Hamming distance",
      "Delimiter character": ","
    },
    "inputPorts": [
      {
        "name": "Input",
        "description": "Named field matrix input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "Output",
        "description": "Distance matrix output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "OANC-Parser",
    "canonicalClassName": "modules.parser.oanc.OANCXMLParser",
    "description": "Parses (O)ANC source files and outputs their contents in a configurable way. Needs a JSON list of the raw source text files as input; automatically determines the corresponding metadata XML files.",
    "category": "parser",
    "propertyDescriptions": {
      "oneJSONObjectPerLine": "If this and \u0027output JSON\u0027 is set to \u0027true\u0027 the output will be one JSON object per line.",
      "outputAnnotatedJson": "If this and \u0027output JSON\u0027 is set to \u0027true\u0027 the output will be annotated JSON.",
      "output JSON": "If set to \u0027true\u0027 the output will be JSON instead of plain text",
      "name": "The module instance\u0027s name",
      "fuegeStartSymbolHinzu": "Set to \u0027true\u0027 if \u0027^\u0027 should be added as start symbol to each sentence",
      "fuegeTerminierSymbolHinzu": "Set to \u0027true\u0027 if \u0027$\u0027 should be added as end symbol to each sentence",
      "wandleInKleinbuchstaben": "If set to \u0027true\u0027 the output will be all lowercase",
      "behaltePunktuation": "If set to \u0027true\u0027 punctuation will not be discarded",
      "word divider": "symbol or string to divide words from each other"
    },
    "propertyDefaultValues": {
      "oneJSONObjectPerLine": "true",
      "outputAnnotatedJson": "true",
      "output JSON": "true",
      "name": "OANC-Parser",
      "fuegeStartSymbolHinzu": "true",
      "fuegeTerminierSymbolHinzu": "true",
      "wandleInKleinbuchstaben": "true",
      "behaltePunktuation": "true",
      "word divider": " "
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "JSON-encoded list of source text file locations.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Character output based on settings.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Paradigm Segmenter",
    "canonicalClassName": "modules.segmentation.paradigmSegmenter.ParadigmSegmenterModule",
    "description": "Reads contents from a JSON-encoded¹ atomic suffix tree (AST²) and based on that data determines paradigm borders in the streamed input. Outputs segmented input data.\u003cbr/\u003e\u003cbr/\u003e------\u003cp\u003e¹: Using the \u003ci\u003emodels.ExtensibleTreeNode\u003c/i\u003e class\u003c/p\u003e\u003cp\u003e²: Giegerich, Robert, and Stefan Kurtz. \u0026quot;From Ukkonen to McCreight and Weiner: A unifying view of linear-time suffix tree construction.\u0026quot; Algorithmica 19.3 (1997): 331-353.\u003cbr/\u003eAvailable at http://link.springer.com/article/10.1007/PL00009177\u003c/p\u003e",
    "category": "segmentation",
    "propertyDescriptions": {
      "Scoring decrease factor": "Factor to modify the weight of a scoring decrease between symbols [double, \u003e0, 1\u003dneutral].",
      "Output document divider": "Divider that will be used to mark the document borders in the output, if applicable.",
      "name": "The module instance\u0027s name",
      "Buffer size": "Size of the segmentation window (should not exceed an enforced depth maximum of the trie [if applicable]).",
      "Output token divider": "Divider that is inserted in between the tokens on output.",
      "Minimal cost": "Minimum cost for every joining step; note that higher values significantly increase the frequency of backtracking [double].",
      "Input token divider": "Divider that marks the input tokens (single character; empty for char-by-char input).",
      "Input document divider": "Divider that marks the input documents (leave empty if input does not divide into separate documents).",
      "Include scoring value in output": "Include scoring values in output."
    },
    "propertyDefaultValues": {
      "Scoring decrease factor": "1",
      "Output document divider": "\\n",
      "name": "Paradigm Segmenter",
      "Buffer size": "10",
      "Minimal cost": "1",
      "Input token divider": "",
      "Input document divider": "\\n",
      "Output token divider": "\\t",
      "Include scoring value in output": "false"
    },
    "inputPorts": [
      {
        "name": "text",
        "description": "Plain text character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "suffix trie",
        "description": "JSON-encoded suffix trie input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Plain text character output (with dividers added).",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "PlainText2TreeBuilder",
    "canonicalClassName": "modules.format_conversion.plainText2TreeBuilder.PlainText2TreeBuilderConverter",
    "description": "(no description)",
    "category": "format conversion",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "PlainText2TreeBuilder"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Plain text character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "JSON-encoded FileFinderModule data.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Random Sequence Splitting",
    "canonicalClassName": "modules.segmentation.seqSplitting.SeqMemory",
    "description": "Splits a DNA sequences (or any other continuous string) into a defined number of fragments with random length.",
    "category": "segmentation",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "Number of splits": "Insert an integer"
    },
    "propertyDefaultValues": {
      "name": "Random Sequence Splitting",
      "Number of splits": "100"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Plain text character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Plain text character output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Random String Example Module",
    "canonicalClassName": "modules.examples.ExampleRandString",
    "description": "Creates a random string of defined length.",
    "category": "examples",
    "propertyDescriptions": {
      "Length of the random String": "Length of the randomly composed String",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "Length of the random String": "5",
      "name": "Random String Example Module"
    },
    "inputPorts": [],
    "outputPorts": [
      {
        "name": "output",
        "description": "Generated string.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "RegEx Line Filter Module",
    "canonicalClassName": "modules.basic_text_processing.RegExLineFilterModule",
    "description": "Filters input lines by the provided regex into matching and non-matching lines.",
    "category": "basic text processing",
    "propertyDescriptions": {
      "regex": "Regular expression to search for",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "regex": "[aeiu]",
      "name": "RegEx Line Filter Module"
    },
    "inputPorts": [
      {
        "name": "Input lines",
        "description": "[text/plain] Input lines to filter.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "Matches",
        "description": "[text/plain] Lines matching the provided regex.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "Non-Matches",
        "description": "[text/plain] Lines not matching the provided regex.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "RegEx Replacement Module",
    "canonicalClassName": "modules.basic_text_processing.RegExReplacementModule",
    "description": "Regular expression text replacement module. Can use escape characters (e.g. \u0027\\n\u0027) and backreferences (marked with \u0027$\u0027, e.g. \u0027$1\u0027).",
    "category": "basic text processing",
    "propertyDescriptions": {
      "regex": "Regular expression to search for",
      "name": "The module instance\u0027s name",
      "unescape": "Perform unescape operation on the replacement string before using it [true|false]",
      "replacement": "Replacement for found strings"
    },
    "propertyDefaultValues": {
      "regex": "[aeiu]",
      "name": "RegEx Replacement Module",
      "unescape": "true",
      "replacement": "o"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Plain text character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Plain text character output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Reverser Module",
    "canonicalClassName": "modules.basic_text_processing.ReverserModule",
    "description": "Reverses a string input.",
    "category": "basic text processing",
    "propertyDescriptions": {
      "Reverse each line": "Reverse line by line instead of reverting the whole input.",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "Reverse each line": "false",
      "name": "Reverser Module"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Plain text character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "reversed",
        "description": "Plain text character output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "SMB File Reader",
    "canonicalClassName": "modules.input_output.SmbFileReaderModule",
    "description": "Reads contents from a SMB/CIFS share. Can handle GZIP compression.",
    "category": "input output",
    "propertyDescriptions": {
      "SMB domain": "SMB Domain",
      "Buffer length": "Length of the I/O buffer",
      "SMB URL to inputfile": "SMB URL to the input file",
      "SMB username": "SMB username",
      "name": "The module instance\u0027s name",
      "Encoding": "The text encoding of the input file (if applicable, else set to empty string)",
      "SMB password": "SMB password",
      "Use GZIP": "Set to \u0027true\u0027 if the input file is compressed using GZIP"
    },
    "propertyDefaultValues": {
      "SMB domain": "WORKGROUP",
      "Buffer length": "8192",
      "SMB URL to inputfile": "smb://sofs2.uni-koeln.de/StringsAndStructures/input.txt",
      "name": "SMB File Reader",
      "Encoding": "UTF-8",
      "Use GZIP": "false"
    },
    "inputPorts": [],
    "outputPorts": [
      {
        "name": "output",
        "description": "Byte or character output.",
        "supportedPipes": [
          "modules.CharPipe",
          "modules.BytePipe"
        ]
      }
    ]
  },
  {
    "name": "SMB File Writer",
    "canonicalClassName": "modules.input_output.SmbFileWriterModule",
    "description": "Writes received input to a SMB/CIFS share. Can apply GZIP compression.",
    "category": "input output",
    "propertyDescriptions": {
      "SMB domain": "SMB Domain",
      "Buffer length": "Length of the I/O buffer",
      "SMB username": "SMB username",
      "name": "The module instance\u0027s name",
      "SMB URL to outputfile": "SMB URL to the output file",
      "Encoding": "The text encoding of the output file (if input is a char pipe)",
      "SMB password": "SMB password",
      "Use GZIP": "Set to \u0027true\u0027 if the output file is to be compressed using GZIP"
    },
    "propertyDefaultValues": {
      "SMB domain": "WORKGROUP",
      "Buffer length": "8192",
      "name": "SMB File Writer",
      "SMB URL to outputfile": "smb://sofs2.uni-koeln.de/StringsAndStructures/input.txt",
      "Encoding": "UTF-8",
      "Use GZIP": "false"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Byte or character input.",
        "supportedPipes": [
          "modules.CharPipe",
          "modules.BytePipe"
        ]
      }
    ],
    "outputPorts": []
  },
  {
    "name": "Segment Combiner Module",
    "canonicalClassName": "modules.segmentation.SegmentCombinerModule",
    "description": "Module to convert a list of binary segmentend strings into a list of unique string with all splits marked.",
    "category": "segmentation",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "Segment Combiner Module"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Binary splits",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Multiple splits",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Segment Distance Matrix",
    "canonicalClassName": "modules.segmentation.SegmentDistanceMatrixModule",
    "description": "Takes a list of segmented strings as input and outputs a segment right-neighbour-occurrence matrix.",
    "category": "experimental",
    "propertyDescriptions": {
      "segment input delimiter regex": "Regular expression to use as segmentation delimiter for the segments of the string.",
      "name": "The module instance\u0027s name",
      "CSV output delimiter (!\u003d \u0027,\u0027)": "String to use as segmentation delimiter between CSV elements."
    },
    "propertyDefaultValues": {
      "segment input delimiter regex": "\\|",
      "name": "Segment Distance Matrix",
      "CSV output delimiter (!\u003d \u0027,\u0027)": ";"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Segment list.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "CSV output of the distance matrix.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "hamming distances",
        "description": "CSV output of the hamming distances between rows of the distance matrix",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Segment Joiner",
    "canonicalClassName": "modules.segmentation.SegmentJoinerModule",
    "description": "Takes a segmented string as input and outputs every possible combination of it with two neighbouring segments being joined.",
    "category": "segmentation",
    "propertyDescriptions": {
      "string input delimiter regex": "Regular expression to use as segmentation delimiter for the strings.",
      "segment input delimiter regex": "Regular expression to use as segmentation delimiter for the segments of the string.",
      "segment output delimiter": "String to insert as segmentation delimiter between segments (does understand escaped sequences and unescapes them).",
      "group output delimiter": "String to insert as segmentation delimiter between groups (does understand escaped sequences and unescapes them).",
      "name": "The module instance\u0027s name",
      "output original string": "Include the original (non-joined or fully joined [depending on segmentation reversal setting]) string in the output (as first element) [true or false].",
      "string output delimiter": "String to insert as segmentation delimiter between strings (does understand escaped sequences and unescapes them).",
      "reverse segmenting": "Reverse the segmentation: Join where segments are split and the other way around [true or false]."
    },
    "propertyDefaultValues": {
      "string input delimiter regex": "\\n",
      "segment input delimiter regex": "\\|",
      "segment output delimiter": "|",
      "group output delimiter": "\\n",
      "name": "Segment Joiner",
      "output original string": "true",
      "string output delimiter": ";",
      "reverse segmenting": "false"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Plain text character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Plain text character output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Segment Matrix",
    "canonicalClassName": "modules.segmentation.SegmentMatrixModule",
    "description": "Takes a list of segmented strings as input and outputs a segment right-neighbour-occurrence matrix.",
    "category": "segmentation",
    "propertyDescriptions": {
      "string input delimiter regex": "Regular expression to use as segmentation delimiter for the strings.",
      "CSV output delimiter": "String to use as segmentation delimiter between CSV elements.",
      "segment input delimiter regex": "Regular expression to use as segmentation delimiter for the segments of the string.",
      "omit zero values": "Omit any value that is zero on output [true|false].",
      "omit empty rows and cols": "Omit any row or column that has only zero values on output [true|false].",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "string input delimiter regex": "\\n",
      "CSV output delimiter": ";",
      "segment input delimiter regex": "\\|",
      "omit zero values": "true",
      "omit empty rows and cols": "true",
      "name": "Segment Matrix"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Segment list.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "CSV output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "SegmentMatrixAnalyzeModule",
    "canonicalClassName": "modules.matrix.SegmentMatrixAnalyzeModule",
    "description": "For now this module just demonstrates how the SegmentMatrix can be queried for values.",
    "category": "experimental",
    "propertyDescriptions": {
      "delimiter between candidate\u0027s": "Opposing split candidates are on single lines, delimited by this sign.",
      "delimiter between candidate\u0027s segments": "Opposing split candidates contain segments split by this delimiter.",
      "matrix input csv delimiter": "Csv delimiter of the input matrix.",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "delimiter between candidate\u0027s": ";",
      "delimiter between candidate\u0027s segments": "\\Q|\\E",
      "matrix input csv delimiter": ";",
      "name": "SegmentMatrixAnalyzeModule"
    },
    "inputPorts": [
      {
        "name": "segment matrix",
        "description": "[text/csv] NamedFieldMatrix from SegmentMatrixModule",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "segmentation candidates",
        "description": "[text/plain] A list of segmentation candidates, one per row.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "[text/plain] A list of labels with their distance in the matrix.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Segmentatation Check Module",
    "canonicalClassName": "modules.segmentation.SegmentationCheckModule",
    "description": "Check for a list of segmented words, how many of those words would be segmented in the same way by a stemmer with linguistic background information.",
    "category": "segmentation",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "Segment separator": "On what single char to split the segments.",
      "Input language": "The input language to use. Either \u0027EN\u0027, \u0027DE\u0027 or \u0027ES\u0027"
    },
    "propertyDefaultValues": {
      "name": "Segmentatation Check Module",
      "Segment separator": "|",
      "Input language": "EN"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "A list with words/tokens on each line separated by a single segmentation char.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Outputs a log showing valid and invalid segmentations as well as a single last line with a count of total recognized lines",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Segmentation Apply Module",
    "canonicalClassName": "modules.segmentation.SegmentationApplyModule",
    "description": "Takes a list of newline separated segmented words and applies their segmentation to the input text",
    "category": "segmentation",
    "propertyDescriptions": {
      "segment delimiter": "delimiter string segmenting the input (and output) words",
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "segment delimiter": "|",
      "name": "Segmentation Apply Module"
    },
    "inputPorts": [
      {
        "name": "segmented words",
        "description": "The segmented words used to segment the text input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "text",
        "description": "The text to segment.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "The input text segmented by the segmentation supplied as input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Segments Transition Network Module",
    "canonicalClassName": "modules.segmentation.SegmentsTransitionNetworkModule",
    "description": "Module to convert a list of segmentend strings into a transition network.",
    "category": "experimental",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "Segments Transition Network Module"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Segment list.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "CSV output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "SeqQuery",
    "canonicalClassName": "modules.tree_editing.seqNewick.SeqQueryController",
    "description": "(no description)",
    "category": "tree editing",
    "propertyDescriptions": {
      "Path label": "Enter Path Label as String\u003c\br\u003ePath label must befin with \"^\"\u003c/br\u003eExample:\u003cpre\u003e\u003ccode\u003e^ATGCGC\u003c/code\u003e\u003c/pre\u003e",
      "name": "The module instance\u0027s name",
      "Newick branch length": "Choose branch length in Newick:\u003c/br\u003e\"true\" \u003d by string.\u003c/br\u003e\"false\" \u003d by node occurence"
    },
    "propertyDefaultValues": {
      "Path label": "^",
      "name": "SeqQuery",
      "Newick branch length": "true"
    },
    "inputPorts": [
      {
        "name": "JSON",
        "description": "[JSON treeBuilder v3]\u003c/br\u003eSuffix tree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "Newick",
        "description": "[plain text] Newick suffix tree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Sequence Tree Properties",
    "canonicalClassName": "modules.tree_properties.seqTreeProperties.SeqTreePropController",
    "description": "(no description)",
    "category": "tree properties",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "Print out tree frequencies?": "\"true\": show tree frequencies\u003c/br\u003e\"false\": do not show tree frequencies"
    },
    "propertyDefaultValues": {
      "name": "Sequence Tree Properties",
      "Print out tree frequencies?": "false"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "[Json] tree input from the \u003c/br\u003etreeBuilder2OutputV2 module",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "[plain text] sequence properties output\u003c/br\u003ein table like form",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "treeFreqOut",
        "description": "[tsv] tree frequencies\u003c/br\u003eas tsv table",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Suffix Tree Vectors to CSV converter",
    "canonicalClassName": "modules.format_conversion.SuffixTreeVector2CsvModule",
    "description": "Converts a JSON-formatted list of vectors (output from SuffixTreeVectorizationWrapper) into a CSV matrix.",
    "category": "format conversion",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "CSV delimiter": "String to use as CSV field delimiter."
    },
    "propertyDefaultValues": {
      "name": "Suffix Tree Vectors to CSV converter",
      "CSV delimiter": ";"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "JSON-formatted list of vectors (output from SuffixTreeVectorizationWrapper).",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "CSV matrix.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "SuffixNetBuilder",
    "canonicalClassName": "modules.experimental.suffixNetBuilder.SuffixNetBuilderModule",
    "description": "Builds a suffix net (for want of a better name) from the text input.",
    "category": "experimental",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "Input delimiter (inner)": "Regular expression to use as inner segmentation delimiter for the input; leave empty for char-by-char segmentation.",
      "Create individual branches": "Creates individual branches for each sentence.",
      "Input delimiter (outer)": "\u003cp\u003eThe \u003ci\u003eouter input delimiter\u003c/i\u003e is used to discern strings from each other that will be inserted into the resulting graph independently, resulting into a \u003ci\u003eGeneralised Suffix Net\u003c/i\u003e.\u003c/p\u003e\u003cp\u003eThe value is interpreted as a \u003ci\u003eRegular Expression\u003c/i\u003e, e.g. \u0027$\u0027 marks the end of a line and \u0027\\$\u0027 means the actual dollar sign; set to \u0027\\z\u0027 for single string input.\u003c/p\u003e"
    },
    "propertyDefaultValues": {
      "name": "SuffixNetBuilder",
      "Input delimiter (inner)": "\\s+",
      "Create individual branches": "false",
      "Input delimiter (outer)": "\\R+"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Plain text input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "JSON encoded graph.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "SuffixTreeClusteringWrapper",
    "canonicalClassName": "modules.clustering.suffixTreeClusteringModuleWrapper.SuffixTreeClusteringModuleWrapper",
    "description": "This is a wrapper to modularize the clustering process.\u003cbr/\u003eIt takes two inputs:\u003cbr/\u003e\u003cul type \u003d\"disc\" \u003e\u003cli\u003eKWIP suffix tree result in xml format\u003c/li\u003e\u003cli\u003ethe suffix tree itself in xml format\u003c/li\u003e\u003c/ul\u003e",
    "category": "deprecated",
    "propertyDescriptions": {
      "clustering type": "Three possible clustering types: \"NJ\" (Neighbor Joining), \"KM\" (flat k-means), \"HAC\" (hierachial agglomerative clustering)",
      "name": "The module instance\u0027s name",
      "vector type": "The feature type of the vector. Possible inputs: \"TF-IDF\", \"TF-DF\", \"binary\"",
      "corpus/text name": "Insert corpus/text name"
    },
    "propertyDefaultValues": {
      "clustering type": "KM",
      "name": "SuffixTreeClusteringWrapper",
      "vector type": "TF-IDF",
      "corpus/text name": "myCorpus"
    },
    "inputPorts": [
      {
        "name": "KWIP xml Result",
        "description": "[text/xml] Input of an XML representation of the KWIP result.",
        "supportedPipes": [
          "modules.BytePipe"
        ]
      },
      {
        "name": "suffixTree",
        "description": "[text/xml] Input of an XML representation of the suffix tree.",
        "supportedPipes": [
          "modules.BytePipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "[text] Plain text character output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "SuffixTreeClusteringWrapperV2",
    "canonicalClassName": "modules.clustering.suffixTreeClusteringModuleWrapper.SuffixTreeClusteringWrapperV2",
    "description": "This is a wrapper to modularize the clustering process.\u003cbr/\u003eIt takes one input:\u003cbr/\u003e\u003cul type \u003d\"disc\" \u003e\u003cli\u003evectors of the type \"SuffixTreeInfo\" in JSON format\u003c/li\u003e\u003c/ul\u003e",
    "category": "clustering",
    "propertyDescriptions": {
      "clustering type": "Three possible clustering types: \"NJ\" (Neighbor Joining), \"KM\" (flat k-means), \"HAC\" (hierachial agglomerative clustering)",
      "matrix input csv delimiter": "The delimiter to use when reading matrix csv input.",
      "name": "The module instance\u0027s name",
      "corpus/text name": "Insert corpus/text name"
    },
    "propertyDefaultValues": {
      "clustering type": "KM",
      "matrix input csv delimiter": ";",
      "name": "SuffixTreeClusteringWrapperV2",
      "corpus/text name": "myCorpus"
    },
    "inputPorts": [
      {
        "name": "byteInput",
        "description": "[byte] deserialized vector after \"SuffixTreeInfoSer\".",
        "supportedPipes": [
          "modules.BytePipe"
        ]
      },
      {
        "name": "NamedFieldMatrix csv",
        "description": "[text/csv] A csv representation of a NamedFieldMatrix to cluster",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "[text] Plain text character output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "json",
        "description": "[JSON] text character output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "SuffixTreeVectorizationWrapper",
    "canonicalClassName": "modules.vectorization.suffixTreeVectorizationWrapper.SuffixTreeVectorizationWrapperController",
    "description": "This is a wrapper to modularize the vectorization process.\u003cbr/\u003eIt takes two inputs:\u003cbr/\u003e\u003cul type \u003d\"disc\" \u003e\u003cli\u003eKWIP suffix tree result in xml format\u003c/li\u003e\u003cli\u003ethe suffix tree itself in xml format\u003c/li\u003e\u003c/ul\u003eIt creates an ouput representation of the vectors of the type \"SuffixTreeInfo\"\u003cbr/\u003ewhich is serialized in JSON format.",
    "category": "vectorization",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "vector type": "The feature type of the vector. Possible inputs: \"TF-IDF\", \"TF-DF\", \"binary\"",
      "corpus/text name": "Insert corpus/text name"
    },
    "propertyDefaultValues": {
      "name": "SuffixTreeVectorizationWrapper",
      "vector type": "TF-IDF"
    },
    "inputPorts": [
      {
        "name": "KWIP xml Result",
        "description": "[text/xml] Input of an XML representation of the KWIP result.",
        "supportedPipes": [
          "modules.BytePipe"
        ]
      },
      {
        "name": "suffixTree",
        "description": "[text/xml] Input of an XML representation of the suffix tree.",
        "supportedPipes": [
          "modules.BytePipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "byteOutput",
        "description": "[byte] serilalized vector output after \"SuffixTreeInfoSer\".",
        "supportedPipes": [
          "modules.BytePipe"
        ]
      },
      {
        "name": "toJson",
        "description": "[JSON] Output: Vector after \"SuffixTreeInfo\" in JSON format.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Text Reducer",
    "canonicalClassName": "modules.format_conversion.TextReducerModule",
    "description": "Encodes the input text by replacing each token with a unique character, producing a reduced text and a dictionary. Can also decode (requires dictionary input).",
    "category": "format conversion",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "encode delimiters": "Encode/decode input delimiters same as tokens [true] or keep them as they are [false].",
      "input token delimiter": "Part of a regular expression to use as token delimiter (also applicable if decoding when the input delimiters have not been encoded). With the default value\u003cpre\u003e[\\s\\n\\r]\u003c/pre\u003ethe full regex would be\u003cpre\u003e((?\u003c\u003d[\\s\\n\\r])|(?\u003d[\\s\\n\\r]))\u003c/pre\u003eThis is in order to get both the tokens \u003ci\u003eand\u003c/i\u003e the delimiters from the scanner that parses the input. Only single char matches are supported.",
      "direction": "Direction [encode|decode]. Decoding requires input both on port \u0027input\u0027 and \u0027dictionary\u0027"
    },
    "propertyDefaultValues": {
      "name": "Text Reducer",
      "encode delimiters": "false",
      "input token delimiter": "[\\s\\n\\r]",
      "direction": "encode"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "Plain text character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "dictionary",
        "description": "Dictionary input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Plain text character output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "dictionary",
        "description": "Dictionary output.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Text Sorter",
    "canonicalClassName": "modules.basic_text_processing.TextSorterModule",
    "description": "Sorts input text (segmented by specifiable pattern) according to alphabetical value or string length.",
    "category": "basic text processing",
    "propertyDescriptions": {
      "output delimiter": "Output delimiter string (values will be unescaped).",
      "unique": "Whether to exclude duplicate segments from the list.",
      "name": "The module instance\u0027s name",
      "sort by": "Attribute to sort elementy by [alphabet|length].",
      "input delimiter": "Regular expression used as an input text segment delimiter.",
      "order": "Sort order [ascending|descending]."
    },
    "propertyDefaultValues": {
      "output delimiter": "\\n",
      "unique": "false",
      "name": "Text Sorter",
      "sort by": "length",
      "input delimiter": "\\R+",
      "order": "ascending"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "[text/plain] Input text to sort.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "[text/plain] Sorted output text.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Tree Index Properties",
    "canonicalClassName": "modules.tree_properties.treeIndexes.TreeIndexController",
    "description": "This modules transverse a Generalized Suffix Tree (GST) depth-first\u003cbr\u003eand analysis different properties for each node and subtree:\u003cbr\u003e\u003cul\u003e\u003cli\u003eNumber of Leaves\u003c/li\u003e\u003cli\u003ePath Length(s)\u003c/li\u003e\u003cli\u003eCophenetic index\u003c/li\u003e\u003cli\u003e(normalized) Sackin Index\u003c/li\u003e\u003c/ul\u003e\u003cb\u003eRequirements:\u003c/b\u003e\u003cul\u003e\u003cli\u003eJSON output from (pre-buffered) \"dot2tree\" conversion module\u003c/li\u003e\u003cli\u003eXML output from GST builder module\u003c/li\u003e\u003c/ul\u003e",
    "category": "tree properties",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "Print out tree frequencies?": "\"true\": show tree frequencies\u003c/br\u003e\"false\": do not show tree frequencies"
    },
    "propertyDefaultValues": {
      "name": "Tree Index Properties",
      "Print out tree frequencies?": "false"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "[Json] tree input from the \u003c/br\u003eDot2GST converter module",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "[plain text] sequence properties output\u003c/br\u003ein table like form",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "treeFreqOut",
        "description": "[tsv] tree frequencies\u003c/br\u003eas tsv table",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Tree Similarity Clustering",
    "canonicalClassName": "modules.clustering.treeSimilarityClustering.TreeSimilarityClusteringModule",
    "description": "Clusters elements of the first layer below the root node of specified trees by comparing them to one another, calculating a similarity quotient for each pairing in the process. The elements will then be inserted into a GEXF graph with edge weights set according to their respective similarity quotient. For details, see Magister thesis \u003ci\u003eExperimente zur Strukturbildung in natürlicher Sprache\u003c/i\u003e, Marcel Boeing, Universität zu Köln, 2014.",
    "category": "clustering",
    "propertyDescriptions": {
      "minimum similarity": "Minimum similarity value that will result in an edge being created.",
      "maximum comparison depth": "Maximum depth of the individual tree branches that will be used for comparison (-1 for no max.).",
      "name": "The module instance\u0027s name",
      "status update interval (ms)": "Interval (in milliseconds) that the module will give out details about the progress in. It will also calculate an estimated time remaining, so larger values may yield more precise information. Default is 10 seconds (10000 ms); minimum is 250 ms.",
      "maximum threads": "Maximum number of parallel threads the module will spawn (in addition to its own thread and the ProgressWatcher\u0027s).",
      "minimum amount of tokens": "Minimum amount of tokens a type must have to enter comparison."
    },
    "propertyDefaultValues": {
      "minimum similarity": "0.0",
      "maximum comparison depth": "-1",
      "name": "Tree Similarity Clustering",
      "status update interval (ms)": "10000",
      "maximum threads": "8",
      "minimum amount of tokens": "1"
    },
    "inputPorts": [
      {
        "name": "suffix tree",
        "description": "ExtensibleTreeNode atomic suffix tree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      },
      {
        "name": "reversed tree",
        "description": "(optional) ExtensibleTreeNode reversed atomic suffix tree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "GEXF graph",
        "description": "GEXF graph.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "TreeBuilder v2 Module",
    "canonicalClassName": "modules.tree_building.treeBuilder.TreeBuilderV2Module",
    "description": "TreeBuilder v2 module. Can process larger datasets more quickly. Replaces AtomicRangeSuffixTrieBuilder and TreeBuilder.",
    "category": "deprecated",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "Omit redundant info": "Omit redundant information upon creating the tree (do not set nodevalue, since this info is already contained within the parent\u0027s child node mapping key).",
      "Compact or atomic?": "Type of suffix tree to output; possible values are \u0027compact\u0027 and \u0027atomic\u0027."
    },
    "propertyDefaultValues": {
      "name": "TreeBuilder v2 Module",
      "Omit redundant info": "true",
      "Compact or atomic?": "compact"
    },
    "inputPorts": [
      {
        "name": "text",
        "description": "Plain text character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "tree",
        "description": "JSON-encoded suffix tree (nodes based on the TreeNode interface).",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "TreeBuilder v3 Module",
    "canonicalClassName": "modules.tree_building.treeBuilder.TreeBuilderV3Module",
    "description": "\u003cp\u003eThis module can be used to construct different types of suffix trees from formatted or non-formatted text input. It uses a custom algorithm and runs in approximate linear time (actually it did turn out that the processing time grows exponentially under certain circumstances, so no guarantee) and uses single thread processing.\u003c/p\u003e\u003cp\u003e The type of tree to build is determined by various parameters. With those, you can build suffix trees that are\u003cul\u003e\u003cli\u003e\u003ci\u003egeneralised\u003c/i\u003e or \u003ci\u003enon-generalised\u003c/i\u003e,\u003c/li\u003e\u003cli\u003e\u003ci\u003eatomic\u003c/i\u003e or \u003ci\u003ecompact\u003c/i\u003e (see [1], p.189f),\u003c/li\u003e\u003cli\u003edepth-restricted or complete.\u003c/li\u003e\u003c/ul\u003e\u003c/p\u003e\u003cp\u003eAdditionally, the tree will also be generated with a variable for each node that counts how many leafes are below. The output is a JSON-encoded tree consisting of \u003ci\u003eExtensibleTreeNode\u003c/i\u003e objects.\u003c/p\u003e\u003col\u003e\u003cli\u003eGiegerich, Robert, and Stefan Kurtz. \u0026quot;A comparison of imperative and purely functional suffix tree constructions.\u0026quot; Science of Computer Programming 25.2 (1995): 187-218.\u003c/li\u003e\u003c/ol\u003e",
    "category": "tree building",
    "propertyDescriptions": {
      "Output delimiter": "String to use as segmentation delimiter for the output; must match with the inner input delimiter regex; leave empty for char-by-char segmentation.",
      "name": "The module instance\u0027s name",
      "Input delimiter (inner)": "Regular expression to use as inner segmentation delimiter for the input; leave empty for char-by-char segmentation.",
      "Omit redundant info": "Omit redundant information upon creating the tree (do not set nodevalue, since this info is already contained within the parent\u0027s child node mapping key).",
      "Compact or atomic?": "Type of suffix tree to output; possible values are \u0027compact\u0027 and \u0027atomic\u0027.",
      "Tree depth": "Maximum depth for the resulting tree; set to -1 for no constraint. A setting of 0 will yield a tree one level deep that contains nodes with a length of one (basically the alphabet of the input, respectively the first element of any document for GSTs).",
      "Input delimiter (outer)": "\u003cp\u003eThe \u003ci\u003eouter input delimiter\u003c/i\u003e is used to discern strings from each other that will be inserted into the resulting tree independently, resulting into a \u003ci\u003eGeneralised Suffix Tree\u003c/i\u003e.\u003c/p\u003e\u003cp\u003eThe value is interpreted as a \u003ci\u003eRegular Expression\u003c/i\u003e, e.g. \u0027$\u0027 marks the end of a line and \u0027\\$\u0027 means the actual dollar sign; set to \u0027\\z\u0027 for single string input.\u003c/p\u003e"
    },
    "propertyDefaultValues": {
      "Output delimiter": " ",
      "name": "TreeBuilder v3 Module",
      "Input delimiter (inner)": "[\\s]+",
      "Omit redundant info": "true",
      "Compact or atomic?": "compact",
      "Tree depth": "-1",
      "Input delimiter (outer)": "\\$"
    },
    "inputPorts": [
      {
        "name": "text",
        "description": "Plain text character input.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "tree",
        "description": "JSON-encoded suffix tree (nodes based on the TreeNode interface).",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "TreeBuilder2Output",
    "canonicalClassName": "modules.format_conversion.treeBuilder2Output.TreeBuilder2OutputController",
    "description": "This module converts the treeBuilder output so that it can be read buy otherdownstream modules such as seqNewickExporter",
    "category": "format conversion",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "TreeBuilder2Output"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "JSON-encoded suffix tree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "JSON-encoded suffix tree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "TreeBuilder2OutputV2",
    "canonicalClassName": "modules.format_conversion.treeBuilder2Output.TreeBuilder2OutputControllerV2",
    "description": "This module converts the treeBuilder output so that it can be read buy otherdownstream modules such as seqNewickExporter",
    "category": "format conversion",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "TreeBuilder2OutputV2"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "JSON-encoded suffix tree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "JSON-encoded suffix tree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Treebuilder",
    "canonicalClassName": "modules.tree_building.treeBuilder.TreeBuilder",
    "description": "Builds a suffixtree from the JSON output of OANCXMLParser (expects annotated JSON, one object per line). Can be configured to build other forms.",
    "category": "deprecated",
    "propertyDescriptions": {
      "Reverse order": "Reverse the order, construct a prefix-tree.",
      "Build trie instead of tree": "Set to true if you want to construct a trie instead of a tree.",
      "name": "The module instance\u0027s name",
      "Maximum length of branches": "Define the maximum length of any branch of the tree."
    },
    "propertyDefaultValues": {
      "Reverse order": "false",
      "Build trie instead of tree": "true",
      "name": "Treebuilder",
      "Maximum length of branches": "-1"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "JSON-encoded data.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "JSON-encoded suffix trie.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Vector Aberration Calculator",
    "canonicalClassName": "modules.vectorization.VectorAberrationCalculatorModule",
    "description": "Calculates aberration for elements within the input vectors, optionally re-sorting them afterwards.",
    "category": "vectorization",
    "propertyDescriptions": {
      "output CSV delimiter": "Output CSV delimiter (escaped chars will be unescaped).",
      "name": "The module instance\u0027s name",
      "sort output": "Sort output values (low to high). If true, the CSV header line will be omitted on output. [true/false]",
      "input CSV delimiter regex": "Input CSV delimiter regex.",
      "exponent": "Exponent for aberration amplification [double]; Aberration is taken times 2^E. Takes effect if value is above zero."
    },
    "propertyDefaultValues": {
      "output CSV delimiter": ",",
      "name": "Vector Aberration Calculator",
      "sort output": "true",
      "input CSV delimiter regex": "[\\,;]",
      "exponent": "0.0"
    },
    "inputPorts": [
      {
        "name": "csv",
        "description": "Vector input; expects comma separated values.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Output; JSON-encoded Map of Sets (Map\u0026lt;String,Set\u0026lt;Double\u0026gt;\u0026gt;).",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "Vector Median Calculator",
    "canonicalClassName": "modules.vectorization.VectorMedianCalculatorModule",
    "description": "Calculates median of elements within the input vectors.",
    "category": "vectorization",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "Vector Median Calculator"
    },
    "inputPorts": [
      {
        "name": "csv",
        "description": "Vector input; expects comma separated values.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Output; JSON-encoded Map (Map\u0026lt;String,Double\u0026gt;).",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "seqNewickExporter",
    "canonicalClassName": "modules.format_conversion.seqNewickExporter.SeqNewickExporterController",
    "description": "(no description)",
    "category": "format conversion",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "Newick branch length": "Choose branch length in Newick: true \u003d by string; false \u003d by node occurence"
    },
    "propertyDefaultValues": {
      "name": "seqNewickExporter",
      "Newick branch length": "true"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "JSON-encoded suffix trie.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Newick-encoded suffix trie.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "seqNewickExporterV2",
    "canonicalClassName": "modules.format_conversion.seqNewickExporter.SeqNewickExporterControllerV2",
    "description": "(no description)",
    "category": "format conversion",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name",
      "Newick branch length": "Choose branch length in Newick: true \u003d by string; false \u003d by node occurence"
    },
    "propertyDefaultValues": {
      "name": "seqNewickExporterV2",
      "Newick branch length": "true"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "JSON-encoded suffix tree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "Newick-encoded suffix tree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  },
  {
    "name": "seqSuffixTrie2SuffixTree",
    "canonicalClassName": "modules.tree_editing.seqSuffixTrie2SuffixTree.SeqSuffixTrie2SuffixTreeController",
    "description": "Reduces a suffix trie to a suffix tree.",
    "category": "tree editing",
    "propertyDescriptions": {
      "name": "The module instance\u0027s name"
    },
    "propertyDefaultValues": {
      "name": "seqSuffixTrie2SuffixTree"
    },
    "inputPorts": [
      {
        "name": "input",
        "description": "JSON-encoded suffix trie.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ],
    "outputPorts": [
      {
        "name": "output",
        "description": "JSON-encoded suffix tree.",
        "supportedPipes": [
          "modules.CharPipe"
        ]
      }
    ]
  }
]
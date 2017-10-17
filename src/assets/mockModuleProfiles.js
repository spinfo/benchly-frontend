export default [
    {
        "name": "ASCIIGraph",
        "canonicalClassName": "modules.visualization.ASCIIGraph",
        "description": "Creates ASCII output with a visual representation of the node distribution within the input graph.",
        "category": "visualization",
        "propertyDescriptions": {
            "Biggest child uses parent symbol": "Has the biggest child of each node use that node's symbol (to visualize the flow of each path most used).",
            "name": "The module instance's name"
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
            "name": "The module instance's name",
            "Length of the randomly composed DNA sequence": "Length of the randomly composed DNA sequence"
        },
        "inputPorts": [ ],
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
            "name": "The module instance's name",
            "Maximum length of branches": "Define the maximum length of any branch of the trie. Set to -1 for no constraint",
            "Reverse the trie": "Reverse the building of the trie (results in a prefix trie)."
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
        "description": "This module reads either<br/><ol><li>A JSON representation of a GeneralisedSuffixTree.<br/>It then constructs bags of words from it. It assumes that the tree's pattern nrs stand in for sentence numbers and treats each node's label as a word.</li><li>A simple List of newline separated sentences.<br/>It then simply splits the words on whitespace.</li></ol><br/>The output in either case is a JSON-serialized TreeMap&lt;Integer,TreeMap&lt;String,Integer&gt;&gt; mapping sentence numbers to maps of \"words\" with a count in the sentence.",
        "category": "bag of words",
        "propertyDescriptions": {
            "name": "The module instance's name"
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
                "description": "[text/json] Bags of Words (class: TreeMap&lt;Integer,TreeMap&lt;String,Integer&gt;&gt;)",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            }
        ]
    },
    {
        "name": "BagsOfWordsDistancesModule",
        "canonicalClassName": "modules.bag_of_words.BagsOfWordsDistancesModule",
        "description": "<p>Module to determine the distance between Bags of Words.</p><p>Currently supports Levenshtein distance, i.e. output is the number of substitutions, deletions or additions of words that would be needed to transform one Bag of Words into another.<p>",
        "category": "bag of words",
        "propertyDescriptions": {
            "Normalize distance": "Divides each distance by it's possible maximum for the two BoWs.",
            "Filter on TF-IDF min": "When computing distances disregards words with tf-idf below this value. Disabled on \"0.0\"",
            "name": "The module instance's name"
        },
        "inputPorts": [
            {
                "name": "json",
                "description": "[text/json] TreeMap<Integer,TreeMap<String,Integer>>",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            }
        ],
        "outputPorts": [
            {
                "name": "json",
                "description": "[text/json] TreeMap<Integer,TreeMap<Integer,Float>>",
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
            "name": "The module instance's name",
            "apply TF-iDF": "Multiply the token values with their <i>Inverse Document Frequencies</i> before calculating the type sum [true|false].",
            "empty value": "String to insert as empty value into the output (only applicable to CSV output).",
            "output format": "Desired output format [csv|json]."
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
        "description": "This module reads plain text dot format from I/O pipe.</br>It parses form the obtained information inner nodes, leaf nodes,</br>edges and suffix links.</br>This module scans the inner nodes exclusively and adds up the length</br>of the branches depending on a pre-defined threshold for a minimum</br>branch length. For this purpose the module follows suffix-links bottom-up</br>a previously constructed generalized suffix tree.</br>",
        "category": "tree properties",
        "propertyDescriptions": {
            "Minimal branch length allowed": "Minimal branch length for edges between nodes needed.</br>This determines the stop during the search(es).",
            "name": "The module instance's name"
        },
        "inputPorts": [
            {
                "name": "dot input",
                "description": "[dot format] Dot output from the</br>GST builder module.",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            },
            {
                "name": "xml input",
                "description": "[xml format] Xml output from the</br>GST builder module.",
                "supportedPipes": [
                    "modules.BytePipe"
                ]
            }
        ],
        "outputPorts": [
            {
                "name": "output",
                "description": "[tsv]</br>Table format",
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
            "name": "The module instance's name"
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
            "name": "The module instance's name",
            "reverse transform": "Conduct reverse Burrows-Wheeler Transformation [true|false]."
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
            "name": "The module instance's name",
            "CSV input delimiter": "Regular expression to use as field delimiter for CSV input",
            "Edge designator": "Designator for edges in the GEXF graph (use to describe type of relationship between connected nodes)"
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
            "Locale": "Tag of the locale to use for the case change. Accepts a IETF BCP 47 language tag string (can be as simple as 'en-US' or 'de-DE'; for details, see https://tools.ietf.org/html/bcp47).",
            "Change to": "Case to change the input to. Accepted values are 'lower[case]' or 'upper[case]'.",
            "name": "The module instance's name"
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
        "name": "ColourGraph",
        "canonicalClassName": "modules.visualization.ColourGraph",
        "description": "Creates an image file a with visual representation of the node distribution within the input graph.",
        "category": "visualization",
        "propertyDescriptions": {
            "Image width": "Width of the output image in pixels.",
            "Image height": "Height of the output image in pixels.",
            "name": "The module instance's name",
            "Pixel per tree level": "Amount of pixels used for each tree level.",
            "Schwellwert fuer Gleichverteilung": "Schwellwert fuer Gleichverteilungsfaktor, oberhalb dessen Knoten ausgeblendet werden (0-1 [double]; 0 blendet alle aus, 1 keine).",
            "Ungleichverteilungen im Baum markieren": "Berechnet den Faktor eines Knotens, der anzeigt, wie gleich dessen Kinder verteilt sind (0>X>=1; 1 bed. absolut gleich verteilt).",
            "Output file": "Specifies the location of the output file (PNG or JPEG).",
            "Markierungsart fuer Ungleichverteilung": "Legt fest, wie die Ungleichverteilung markiert wird (alpha|rot|alpha+rot|keine)."
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
        "outputPorts": [ ]
    },
    {
        "name": "Comparison Module",
        "canonicalClassName": "modules.basic_text_processing.ComparisonModule",
        "description": "Module reads from two input ports and outputs 1) lines only in the first input, 2) lines only in the second input, 3) lines in both inputs.",
        "category": "basic text processing",
        "propertyDescriptions": {
            "name": "The module instance's name",
            "Separator": "A separator to split input on. Defaults to newlines."
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
        "name": "Console Reader",
        "canonicalClassName": "modules.input_output.ConsoleReaderModule",
        "description": "Reads contents from stdin and relays it via character stream.",
        "category": "input output",
        "propertyDescriptions": {
            "Buffer length": "Length of the I/O buffer",
            "name": "The module instance's name",
            "Encoding": "The text encoding of the input (if applicable, else set to empty string)"
        },
        "inputPorts": [ ],
        "outputPorts": [
            {
                "name": "output",
                "description": "Character output.",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            }
        ]
    },
    {
        "name": "Console Writer",
        "canonicalClassName": "modules.input_output.ConsoleWriterModule",
        "description": "Writes char output to console.",
        "category": "input output",
        "propertyDescriptions": {
            "name": "The module instance's name"
        },
        "inputPorts": [
            {
                "name": "input",
                "description": "Accepts byte stream and character input.",
                "supportedPipes": [
                    "modules.CharPipe",
                    "modules.BytePipe"
                ]
            }
        ],
        "outputPorts": [ ]
    },
    {
        "name": "Distance Matrix",
        "canonicalClassName": "modules.matrix.distanceModule.DistanceMatrixModule",
        "description": "Creates a distance-matrix from any input matrix.",
        "category": "matrix",
        "propertyDescriptions": {
            "output delimiter": "String to insert as CSV delimiter (only applicable to CSV output).",
            "name": "The module instance's name",
            "input delimiter": "Input matrix' delimiter",
            "distance type": "Two possible distance types: \"ED\" (Euclidean distance), \"CD\" (Cosine Distance) \"CS\" (Cosine similarity)"
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
        "description": "This module converts dot format from a (generalized) suffix tree into a data structure</br>allowes tree walking and tree structure analysis.",
        "category": "format conversion",
        "propertyDescriptions": {
            "name": "The module instance's name"
        },
        "inputPorts": [
            {
                "name": "dot input",
                "description": "[dot format] Dot output from the</br>GST builder module.",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            },
            {
                "name": "xml input",
                "description": "[xml format] Xml output from the</br>GST builder module.",
                "supportedPipes": [
                    "modules.BytePipe"
                ]
            }
        ],
        "outputPorts": [
            {
                "name": "output",
                "description": "[byte/binary or JSON]</br>Data structure representing a (generalized) suffix tree",
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
            "name": "The module instance's name",
            "zero value": "String to insert as zero value into the output, replacing an eliminated row/column-value."
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
        "description": "Example Module: Deserializing a test string in JSON format.<br/> Output is plain text.",
        "category": "examples",
        "propertyDescriptions": {
            "name": "The module instance's name"
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
        "description": "Example Module: Serializing a plain test string.<br/> Output is JSON format.",
        "category": "examples",
        "propertyDescriptions": {
            "name": "The module instance's name"
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
        "description": "<p>Segments two inputs and entwines them.</p><p>Among other things, you can use it<br/><ul><li>as a template to base your own modules on,</li><li>to review basic practices, like I/O,</li><li>and to get an overview of the standard implementations needed.</li></ul></p>",
        "category": "examples",
        "propertyDescriptions": {
            "delimiter out": "String to insert as segmentation delimiter into the output",
            "name": "The module instance's name",
            "delimiter A": "Regular expression to use as segmentation delimiter for input A",
            "delimiter B": "Regular expression to use as segmentation delimiter for input B"
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
            "name": "The module instance's name",
            "CSV delimiter": "String to use as CSV field delimiter."
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
            "name": "The module instance's name"
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
        "name": "External Command Module",
        "canonicalClassName": "modules.input_output.ExternalCommandModule",
        "description": "Executes an external system command.<br/>Can use streamed character or byte input as command stdin.",
        "category": "input output",
        "propertyDescriptions": {
            "name": "The module instance's name",
            "directory": "Working directory to execute the command in. Please specify the complete path. On MS Windows, use '\\\\' as path separator.",
            "command": "Command to execute. Please specify the complete path.<br/>Explicit parameters can be separated by using ',' (comma) as a delimiter (use '\\,' if you want a literal comma). Most of the times with linux/unix it is best to wrap the command in a shell, in this case meaning that you prefix your command with '/bin/sh,-c,'. On MS Windows, please use '\\\\' as path separator."
        },
        "inputPorts": [
            {
                "name": "input",
                "description": "Standard input (character or byte).",
                "supportedPipes": [
                    "modules.CharPipe",
                    "modules.BytePipe"
                ]
            }
        ],
        "outputPorts": [
            {
                "name": "stdout",
                "description": "Standard output (character or byte).",
                "supportedPipes": [
                    "modules.CharPipe",
                    "modules.BytePipe"
                ]
            },
            {
                "name": "stderr",
                "description": "Error output (character).",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            }
        ]
    },
    {
        "name": "File Finder",
        "canonicalClassName": "modules.input_output.FileFinderModule",
        "description": "Searches for files with the specified suffix beneath the specified path(s) and outputs their locations in a JSON-encoded file list.",
        "category": "input output",
        "propertyDescriptions": {
            "name": "The module instance's name",
            "path to search": "The path(s) to search for text files (directories are searched recursively). Multiple paths must be separated by semicolons (;).",
            "file name suffix": "File name suffix to search for (e.g. 'txt')."
        },
        "inputPorts": [ ],
        "outputPorts": [
            {
                "name": "file list",
                "description": "JSON-encoded list of source file locations.",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            }
        ]
    },
    {
        "name": "File Reader",
        "canonicalClassName": "modules.input_output.FileReaderModule",
        "description": "Reads contents from a file. Can handle GZIP compression.",
        "category": "input output",
        "propertyDescriptions": {
            "inputfile": "Path to the input file",
            "Normalize Unicode": "Normalize Unicode input text to composed form (see http://unicode.org/reports/tr15/). Only valid for char pipe output. [true|false]",
            "Buffer length": "Length of the I/O buffer",
            "name": "The module instance's name",
            "Encoding": "The text encoding of the input file (if applicable, else set to empty string)",
            "Use GZIP": "Set to 'true' if the input file is compressed using GZIP"
        },
        "inputPorts": [ ],
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
        "name": "File Writer",
        "canonicalClassName": "modules.input_output.FileWriterModule",
        "description": "Writes received input to a file. Can apply GZIP compression.",
        "category": "input output",
        "propertyDescriptions": {
            "Buffer length": "Length of the I/O buffer",
            "outputfile": "Path to the output file",
            "name": "The module instance's name",
            "Encoding": "The text encoding of the output file (if input is a char pipe)",
            "Use GZIP": "Set to 'true' if the output file is to be compressed using GZIP"
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
        "outputPorts": [ ]
    },
    {
        "name": "Filter Module",
        "canonicalClassName": "modules.basic_text_processing.FilterModule",
        "description": "Filters out strings not matching the specified minimum or maximum length.",
        "category": "basic text processing",
        "propertyDescriptions": {
            "minlength": "minimum length of ...",
            "maxlength": "maximum length of ...",
            "name": "The module instance's name"
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
        "description": "Creates a randomly composed DNA sequences of defined length. Allows for specification of the amount of Letters 'C' and 'G', in the form of a decimal probability.",
        "category": "generators",
        "propertyDescriptions": {
            "name": "The module instance's name",
            "Amount of letters 'C' and 'G'": "Amount of letters 'C' and 'G'",
            "Length of the randomly composed DNA sequence": "Length of the randomly composed DNA sequence"
        },
        "inputPorts": [ ],
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
        "description": "Filters GEXF data according to the specified parameters. Expects nodes to have the attribute 'nodeCounter' indicating the amount of tokens associated.",
        "category": "graph editing",
        "propertyDescriptions": {
            "minimum similarity": "Minimum similarity value an edge must have to be kept in the graph.",
            "name": "The module instance's name",
            "minimum amount of tokens": "Minimum amount of tokens a type must have to be kept in the graph."
        },
        "inputPorts": [
            {
                "name": "GEXF graph",
                "description": "GEXF graph. Nodes must have the attribute 'nodeCounter'.",
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
            "name": "The module instance's name"
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
                "description": "For each input text the output is that path in the tree split into it's edges.",
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
            "name": "The module instance's name"
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
            "name": "The module instance's name",
            "window size": "Size of the sliding window (default: 5)",
            "field separator": "Separator for the CSV fields"
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
            "name": "The module instance's name"
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
            "name": "The module instance's name"
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
            "name": "The module instance's name"
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
        "description": "Takes a successor matrix and a list from the matrix bitwise operation module and forms lexical-functional groups out of the matrix' entries.",
        "category": "experimental",
        "propertyDescriptions": {
            "name": "The module instance's name",
            "output empty lexical groups": "A boolean value. Whether to output gorups with no or only the empty (i.e. \"\") lexical",
            "Pair list cutoff value": "At or below which value reading of the pair list should stop.",
            "csv delimiter": "Delimiter of the input csv cells."
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
            "name": "The module instance's name"
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
            "r": "Exponent in the inflation step, double >= 1.",
            "name": "The module instance's name",
            "l": "Amount of matrix multiplications per iteration, int >= 1.",
            "iterations": "How often to iterate the inflation and deflation steps.",
            "csv delimiter": "Delimiter of the input csv cells."
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
            "name": "The module instance's name",
            "Reflexive": "Whether the operation should be applied to a row/col with itself.",
            "operation": "Which operation to perform, one of: AND, OR, XOR.",
            "Operate on rows": "Whether to operate on rows (true) or columns (false)."
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
                "description": "Competition entries ';' separated",
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
            "name": "The module instance's name"
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
            "name": "The module instance's name",
            "match regex": "Regex that describes a positive match."
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
            "name": "The module instance's name",
            "output delimiter (inner)": "String to insert as segmentation delimiter between row- and column-values (escaped values will be unescaped).",
            "match regex": "Regex that describes a positive match."
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
            "expression": "An expression to evaluate on each matrix cell. Use 'VAL' to refer to the cell value. Expression has to result in a result of class Double.",
            "name": "The module instance's name",
            "csv delimiter": "The csv delimiter used in input and output."
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
            "name": "The module instance's name",
            "input delimiter": "Delimiter of input csv",
            "output format": "Desired output format [csv|json]."
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
            "name": "The module instance's name",
            "ouput format": "Format of output [json|csv].",
            "csv input delimiter regex": "Regular expression to use as segmentation delimiter for CSV input."
        },
        "inputPorts": [
            {
                "name": "input",
                "description": "CSV or JSON formatted two-dimensional matrix (Map&lt;String,Set&lt;Double&gt;&gt;).",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            }
        ],
        "outputPorts": [
            {
                "name": "output",
                "description": "CSV or JSON formatted distance matrix output (Map&lt;String,Map&lt;String,Double&gt;&gt;).",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            }
        ]
    },
    {
        "name": "Morphology Check Module",
        "canonicalClassName": "modules.morphology.MorphologyCheckModule",
        "description": "A module to check groups of comma separated morphemes (one group per line, comma separated) against groups of correct morphemes (one group per line, comma separated, optionally starting with a label followed by ':')",
        "category": "morphology",
        "propertyDescriptions": {
            "name": "The module instance's name"
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
                "description": "groups of correct morphemes to check against (one group per line, comma separated, optionally starting with a label followed by ':')",
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
        "description": "This module transverses a Generalized Suffix Tree (GST) bottom up<br>and detects nodes which are linked by suffix-links to one-another. <br>Such nodes which include a common starting edge (constant identical edge) and ...<br><b>Requirements:</b><br><em>pending...</em>",
        "category": "tree properties",
        "propertyDescriptions": {
            "Maximum number of trials": "Maximal tries allowed to find linked parents with alpha edge.",
            "Minimum length for alpha": "Minimal length for identical string alpha allowed.",
            "name": "The module instance's name",
            "Minim length for delta": "Minimal length for identical string delta allowed."
        },
        "inputPorts": [
            {
                "name": "dot input",
                "description": "<b>[dot format]</b> Dot output from the<br>GST builder module.",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            },
            {
                "name": "xml input",
                "description": "<b>[xml format]</b> Xml output from the<br>GST builder module.",
                "supportedPipes": [
                    "modules.BytePipe"
                ]
            }
        ],
        "outputPorts": [
            {
                "name": "output",
                "description": "<b>[tsv]</b> Table format",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            }
        ]
    },
    {
        "name": "Named Field Matrix Hamming distance",
        "canonicalClassName": "modules.matrix.MatrixOperations",
        "description": "<h1>Named Field Matrix Hamming distance</h1><p>This module reads a plain Named Field Matrix (csv, tsv etc.)and calculates the Hamming distance row wise.</p>",
        "category": "matrix",
        "propertyDescriptions": {
            "Delimiter used for the output": "<p>Specifies the delimiter used in the CSV<br />table for the output file.</p>",
            "name": "The module instance's name",
            "Delimiter character": "ASCII character used to delimit each column."
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
            "oneJSONObjectPerLine": "If this and 'output JSON' is set to 'true' the output will be one JSON object per line.",
            "outputAnnotatedJson": "If this and 'output JSON' is set to 'true' the output will be annotated JSON.",
            "output JSON": "If set to 'true' the output will be JSON instead of plain text",
            "name": "The module instance's name",
            "fuegeStartSymbolHinzu": "Set to 'true' if '^' should be added as start symbol to each sentence",
            "fuegeTerminierSymbolHinzu": "Set to 'true' if '$' should be added as end symbol to each sentence",
            "wandleInKleinbuchstaben": "If set to 'true' the output will be all lowercase",
            "behaltePunktuation": "If set to 'true' punctuation will not be discarded",
            "word divider": "symbol or string to divide words from each other"
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
        "description": "Reads contents from a JSON-encoded¹ atomic suffix tree (AST²) and based on that data determines paradigm borders in the streamed input. Outputs segmented input data.<br/><br/>------<p>¹: Using the <i>models.ExtensibleTreeNode</i> class</p><p>²: Giegerich, Robert, and Stefan Kurtz. &quot;From Ukkonen to McCreight and Weiner: A unifying view of linear-time suffix tree construction.&quot; Algorithmica 19.3 (1997): 331-353.<br/>Available at http://link.springer.com/article/10.1007/PL00009177</p>",
        "category": "segmentation",
        "propertyDescriptions": {
            "Scoring decrease factor": "Factor to modify the weight of a scoring decrease between symbols [double, >0, 1=neutral].",
            "Output document divider": "Divider that will be used to mark the document borders in the output, if applicable.",
            "name": "The module instance's name",
            "Buffer size": "Size of the segmentation window (should not exceed an enforced depth maximum of the trie [if applicable]).",
            "Output token divider": "Divider that is inserted in between the tokens on output.",
            "Minimal cost": "Minimum cost for every joining step; note that higher values significantly increase the frequency of backtracking [double].",
            "Input token divider": "Divider that marks the input tokens (single character; empty for char-by-char input).",
            "Input document divider": "Divider that marks the input documents (leave empty if input does not divide into separate documents).",
            "Include scoring value in output": "Include scoring values in output."
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
            "name": "The module instance's name"
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
            "name": "The module instance's name",
            "Number of splits": "Insert an integer"
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
            "name": "The module instance's name"
        },
        "inputPorts": [ ],
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
            "name": "The module instance's name"
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
        "description": "Regular expression text replacement module. Can use escape characters (e.g. '\\n') and backreferences (marked with '$', e.g. '$1').",
        "category": "basic text processing",
        "propertyDescriptions": {
            "regex": "Regular expression to search for",
            "name": "The module instance's name",
            "unescape": "Perform unescape operation on the replacement string before using it [true|false]",
            "replacement": "Replacement for found strings"
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
            "name": "The module instance's name"
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
            "name": "The module instance's name",
            "Encoding": "The text encoding of the input file (if applicable, else set to empty string)",
            "SMB password": "SMB password",
            "Use GZIP": "Set to 'true' if the input file is compressed using GZIP"
        },
        "inputPorts": [ ],
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
            "name": "The module instance's name",
            "SMB URL to outputfile": "SMB URL to the output file",
            "Encoding": "The text encoding of the output file (if input is a char pipe)",
            "SMB password": "SMB password",
            "Use GZIP": "Set to 'true' if the output file is to be compressed using GZIP"
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
        "outputPorts": [ ]
    },
    {
        "name": "Segment Combiner Module",
        "canonicalClassName": "modules.segmentation.SegmentCombinerModule",
        "description": "Module to convert a list of binary segmentend strings into a list of unique string with all splits marked.",
        "category": "segmentation",
        "propertyDescriptions": {
            "name": "The module instance's name"
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
            "name": "The module instance's name",
            "CSV output delimiter (!= ',')": "String to use as segmentation delimiter between CSV elements."
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
            "name": "The module instance's name",
            "output original string": "Include the original (non-joined or fully joined [depending on segmentation reversal setting]) string in the output (as first element) [true or false].",
            "string output delimiter": "String to insert as segmentation delimiter between strings (does understand escaped sequences and unescapes them).",
            "reverse segmenting": "Reverse the segmentation: Join where segments are split and the other way around [true or false]."
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
            "name": "The module instance's name"
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
            "delimiter between candidate's": "Opposing split candidates are on single lines, delimited by this sign.",
            "delimiter between candidate's segments": "Opposing split candidates contain segments split by this delimiter.",
            "matrix input csv delimiter": "Csv delimiter of the input matrix.",
            "name": "The module instance's name"
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
            "name": "The module instance's name",
            "Segment separator": "On what single char to split the segments.",
            "Input language": "The input language to use. Either 'EN', 'DE' or 'ES'"
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
            "name": "The module instance's name"
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
            "name": "The module instance's name"
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
            "Path label": "Enter Path Label as String<\br>Path label must befin with \"^\"</br>Example:<pre><code>^ATGCGC</code></pre>",
            "name": "The module instance's name",
            "Newick branch length": "Choose branch length in Newick:</br>\"true\" = by string.</br>\"false\" = by node occurence"
        },
        "inputPorts": [
            {
                "name": "JSON",
                "description": "[JSON treeBuilder v3]</br>Suffix tree.",
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
            "name": "The module instance's name",
            "Print out tree frequencies?": "\"true\": show tree frequencies</br>\"false\": do not show tree frequencies"
        },
        "inputPorts": [
            {
                "name": "input",
                "description": "[Json] tree input from the </br>treeBuilder2OutputV2 module",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            }
        ],
        "outputPorts": [
            {
                "name": "output",
                "description": "[plain text] sequence properties output</br>in table like form",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            },
            {
                "name": "treeFreqOut",
                "description": "[tsv] tree frequencies</br>as tsv table",
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
            "name": "The module instance's name",
            "CSV delimiter": "String to use as CSV field delimiter."
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
            "name": "The module instance's name",
            "Input delimiter (inner)": "Regular expression to use as inner segmentation delimiter for the input; leave empty for char-by-char segmentation.",
            "Create individual branches": "Creates individual branches for each sentence.",
            "Input delimiter (outer)": "<p>The <i>outer input delimiter</i> is used to discern strings from each other that will be inserted into the resulting graph independently, resulting into a <i>Generalised Suffix Net</i>.</p><p>The value is interpreted as a <i>Regular Expression</i>, e.g. '$' marks the end of a line and '\\$' means the actual dollar sign; set to '\\z' for single string input.</p>"
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
        "description": "This is a wrapper to modularize the clustering process.<br/>It takes two inputs:<br/><ul type =\"disc\" ><li>KWIP suffix tree result in xml format</li><li>the suffix tree itself in xml format</li></ul>",
        "category": "deprecated",
        "propertyDescriptions": {
            "clustering type": "Three possible clustering types: \"NJ\" (Neighbor Joining), \"KM\" (flat k-means), \"HAC\" (hierachial agglomerative clustering)",
            "name": "The module instance's name",
            "vector type": "The feature type of the vector. Possible inputs: \"TF-IDF\", \"TF-DF\", \"binary\"",
            "corpus/text name": "Insert corpus/text name"
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
        "description": "This is a wrapper to modularize the clustering process.<br/>It takes one input:<br/><ul type =\"disc\" ><li>vectors of the type \"SuffixTreeInfo\" in JSON format</li></ul>",
        "category": "clustering",
        "propertyDescriptions": {
            "clustering type": "Three possible clustering types: \"NJ\" (Neighbor Joining), \"KM\" (flat k-means), \"HAC\" (hierachial agglomerative clustering)",
            "matrix input csv delimiter": "The delimiter to use when reading matrix csv input.",
            "name": "The module instance's name",
            "corpus/text name": "Insert corpus/text name"
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
        "description": "This is a wrapper to modularize the vectorization process.<br/>It takes two inputs:<br/><ul type =\"disc\" ><li>KWIP suffix tree result in xml format</li><li>the suffix tree itself in xml format</li></ul>It creates an ouput representation of the vectors of the type \"SuffixTreeInfo\"<br/>which is serialized in JSON format.",
        "category": "vectorization",
        "propertyDescriptions": {
            "name": "The module instance's name",
            "vector type": "The feature type of the vector. Possible inputs: \"TF-IDF\", \"TF-DF\", \"binary\"",
            "corpus/text name": "Insert corpus/text name"
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
            "name": "The module instance's name",
            "encode delimiters": "Encode/decode input delimiters same as tokens [true] or keep them as they are [false].",
            "input token delimiter": "Part of a regular expression to use as token delimiter (also applicable if decoding when the input delimiters have not been encoded). With the default value<pre>[\\s\\n\\r]</pre>the full regex would be<pre>((?<=[\\s\\n\\r])|(?=[\\s\\n\\r]))</pre>This is in order to get both the tokens <i>and</i> the delimiters from the scanner that parses the input. Only single char matches are supported.",
            "direction": "Direction [encode|decode]. Decoding requires input both on port 'input' and 'dictionary'"
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
            "name": "The module instance's name",
            "sort by": "Attribute to sort elementy by [alphabet|length].",
            "input delimiter": "Regular expression used as an input text segment delimiter.",
            "order": "Sort order [ascending|descending]."
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
        "description": "This modules transverse a Generalized Suffix Tree (GST) depth-first<br>and analysis different properties for each node and subtree:<br><ul><li>Number of Leaves</li><li>Path Length(s)</li><li>Cophenetic index</li><li>(normalized) Sackin Index</li></ul><b>Requirements:</b><ul><li>JSON output from (pre-buffered) \"dot2tree\" conversion module</li><li>XML output from GST builder module</li></ul>",
        "category": "tree properties",
        "propertyDescriptions": {
            "name": "The module instance's name",
            "Print out tree frequencies?": "\"true\": show tree frequencies</br>\"false\": do not show tree frequencies"
        },
        "inputPorts": [
            {
                "name": "input",
                "description": "[Json] tree input from the </br>Dot2GST converter module",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            }
        ],
        "outputPorts": [
            {
                "name": "output",
                "description": "[plain text] sequence properties output</br>in table like form",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            },
            {
                "name": "treeFreqOut",
                "description": "[tsv] tree frequencies</br>as tsv table",
                "supportedPipes": [
                    "modules.CharPipe"
                ]
            }
        ]
    },
    {
        "name": "Tree Similarity Clustering",
        "canonicalClassName": "modules.clustering.treeSimilarityClustering.TreeSimilarityClusteringModule",
        "description": "Clusters elements of the first layer below the root node of specified trees by comparing them to one another, calculating a similarity quotient for each pairing in the process. The elements will then be inserted into a GEXF graph with edge weights set according to their respective similarity quotient. For details, see Magister thesis <i>Experimente zur Strukturbildung in natürlicher Sprache</i>, Marcel Boeing, Universität zu Köln, 2014.",
        "category": "clustering",
        "propertyDescriptions": {
            "minimum similarity": "Minimum similarity value that will result in an edge being created.",
            "maximum comparison depth": "Maximum depth of the individual tree branches that will be used for comparison (-1 for no max.).",
            "name": "The module instance's name",
            "status update interval (ms)": "Interval (in milliseconds) that the module will give out details about the progress in. It will also calculate an estimated time remaining, so larger values may yield more precise information. Default is 10 seconds (10000 ms); minimum is 250 ms.",
            "maximum threads": "Maximum number of parallel threads the module will spawn (in addition to its own thread and the ProgressWatcher's).",
            "minimum amount of tokens": "Minimum amount of tokens a type must have to enter comparison."
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
            "name": "The module instance's name",
            "Omit redundant info": "Omit redundant information upon creating the tree (do not set nodevalue, since this info is already contained within the parent's child node mapping key).",
            "Compact or atomic?": "Type of suffix tree to output; possible values are 'compact' and 'atomic'."
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
        "description": "<p>This module can be used to construct different types of suffix trees from formatted or non-formatted text input. It uses a custom algorithm and runs in approximate linear time (actually it did turn out that the processing time grows exponentially under certain circumstances, so no guarantee) and uses single thread processing.</p><p> The type of tree to build is determined by various parameters. With those, you can build suffix trees that are<ul><li><i>generalised</i> or <i>non-generalised</i>,</li><li><i>atomic</i> or <i>compact</i> (see [1], p.189f),</li><li>depth-restricted or complete.</li></ul></p><p>Additionally, the tree will also be generated with a variable for each node that counts how many leafes are below. The output is a JSON-encoded tree consisting of <i>ExtensibleTreeNode</i> objects.</p><ol><li>Giegerich, Robert, and Stefan Kurtz. &quot;A comparison of imperative and purely functional suffix tree constructions.&quot; Science of Computer Programming 25.2 (1995): 187-218.</li></ol>",
        "category": "tree building",
        "propertyDescriptions": {
            "Output delimiter": "String to use as segmentation delimiter for the output; must match with the inner input delimiter regex; leave empty for char-by-char segmentation.",
            "name": "The module instance's name",
            "Input delimiter (inner)": "Regular expression to use as inner segmentation delimiter for the input; leave empty for char-by-char segmentation.",
            "Omit redundant info": "Omit redundant information upon creating the tree (do not set nodevalue, since this info is already contained within the parent's child node mapping key).",
            "Compact or atomic?": "Type of suffix tree to output; possible values are 'compact' and 'atomic'.",
            "Tree depth": "Maximum depth for the resulting tree; set to -1 for no constraint. A setting of 0 will yield a tree one level deep that contains nodes with a length of one (basically the alphabet of the input, respectively the first element of any document for GSTs).",
            "Input delimiter (outer)": "<p>The <i>outer input delimiter</i> is used to discern strings from each other that will be inserted into the resulting tree independently, resulting into a <i>Generalised Suffix Tree</i>.</p><p>The value is interpreted as a <i>Regular Expression</i>, e.g. '$' marks the end of a line and '\\$' means the actual dollar sign; set to '\\z' for single string input.</p>"
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
            "name": "The module instance's name"
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
            "name": "The module instance's name"
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
            "name": "The module instance's name",
            "Maximum length of branches": "Define the maximum length of any branch of the tree."
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
            "name": "The module instance's name",
            "sort output": "Sort output values (low to high). If true, the CSV header line will be omitted on output. [true/false]",
            "input CSV delimiter regex": "Input CSV delimiter regex.",
            "exponent": "Exponent for aberration amplification [double]; Aberration is taken times 2^E. Takes effect if value is above zero."
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
                "description": "Output; JSON-encoded Map of Sets (Map&lt;String,Set&lt;Double&gt;&gt;).",
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
            "name": "The module instance's name"
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
                "description": "Output; JSON-encoded Map (Map&lt;String,Double&gt;).",
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
            "name": "The module instance's name",
            "Newick branch length": "Choose branch length in Newick: true = by string; false = by node occurence"
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
            "name": "The module instance's name",
            "Newick branch length": "Choose branch length in Newick: true = by string; false = by node occurence"
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
            "name": "The module instance's name"
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

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const SubjectModel = new Schema({
    department: {
        type: String,
        required: true
    },
    name: {
        type: String,
        requiredP: true
    },
    type: {
        type: String,
        required: true
    },
    semestar: {
        type: Number,
        required: true,
    },
    id: {
        type: String,
        required: true
    },
    weekly: {
        type: {
            lectures: {
                type: Number,
                required: false
            },
            exercise: {
                type: Number,
                required: false
            },
            lab: {
                type: Number,
                required: false
            }
        },
        required: false
    },
    espb: {
        type: Number,
        required: true
    },
    classTime: {
        type: [String],
        require: true
    },
    propositions: {
        type: String,
        require: true
    },
    subjectGoal: {
        type: String,
        require: true
    },
    examMaterials: {
        type: {
            examExamples: {
                type: [
                    {
                        name: {
                            type: String,
                            require: false
                        },
                        link: {
                            type: String,
                            require: false
                        },
                        format: {
                            type: String,
                            required: false
                        },
                        number: {
                            type: String,
                            required: false
                        },
                        size: {
                            type: String,
                            required: false
                        },
                        employee: {
                            type: String,
                            required: true,
                            default: 'Niko'
                        },
                        date: {
                            type: Date,
                            required: true,
                            default: Date.now()
                        }

                    }
                ],
                required: false
            },
            examSolutions: {
                type: [
                    {
                        name: {
                            type: String,
                            require: false
                        },
                        link: {
                            type: String,
                            require: false
                        },
                        format: {
                            type: String,
                            required: false
                        },
                        number: {
                            type: Number,
                            required: false
                        },
                        size: {
                            type: String,
                            required: false
                        },
                        employee: {
                            type: String,
                            required: true,
                            default: 'Niko'
                        },
                        date: {
                            type: Date,
                            required: true,
                            default: Date.now()
                        }

                    }
                ],
                required: false
            },
            isExamExamplesHidden: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        required: false
    },
    lectures: {
        type: [
            {
                name: {
                    type: String,
                    require: false
                },
                link: {
                    type: String,
                    require: false
                },
                format: {
                    type: String,
                    required: false
                },
                number: {
                    type: String,
                    required: false
                },
                size: {
                    type: String,
                    required: false
                },
                employee: {
                    type: String,
                    required: true,
                    default: 'Niko'
                },
                date: {
                    type: Date,
                    required: true,
                    default: Date.now()
                }

            }
        ],
        required: false
    },
    exercises: {
        type: [
            {
                name: {
                    type: String,
                    require: false
                },
                link: {
                    type: String,
                    require: false
                },
                format: {
                    type: String,
                    required: false
                },
                number: {
                    type: String,
                    required: false
                },
                size: {
                    type: String,
                    required: false,

                },
                employee: {
                    type: String,
                    required: true,
                    default: 'Niko'
                },
                date: {
                    type: Date,
                    required: true,
                    default: Date.now()
                }

            }
        ],
        required: false
    },
    haveLab: {
        type: Boolean,
        required: false,
        default: false
    },
    lab: {
        type: {
            isHidden: {
                type: Boolean,
                required: true
            },
            count: {
                type: Number,
                required: false
            },
            info: {
                type: String,
                required: false
            },
            labs: {
                type: [{
                    labName: {
                        type: String,
                        required: false
                    },
                    description: {
                        type: String,
                        required: false
                    },
                    materials: {
                        type: [
                            {
                                name: {
                                    type: String,
                                    require: false
                                },
                                link: {
                                    type: String,
                                    require: false
                                },
                                format: {
                                    type: String,
                                    required: false
                                },
                                number: {
                                    type: String,
                                    required: false
                                }
                                ,
                                size: {
                                    type: String,
                                    required: false
                                },
                                employee: {
                                    type: String,
                                    required: true,
                                    default: 'Niko'
                                },
                                date: {
                                    type: Date,
                                    required: true,
                                    default: Date.now()
                                }

                            }
                        ],
                        required: false
                    }
                }],
            }
        }
    },
    project: {
        type: {
            isHidden: {
                type: Boolean,
                required: true
            },
            info: {
                type: String,
                required: false
            },
            projects: {
                type: [{
                    _id: {
                        type: mongoose.Types.ObjectId,
                        default: new mongoose.Types.ObjectId(), 
                        required: true
                    },
                    info: {
                        type: String,
                        required: false
                    },
                    materials: {
                        type: [
                            {
                                name: {
                                    type: String,
                                    require: false
                                },
                                link: {
                                    type: String,
                                    require: false
                                },
                                format: {
                                    type: String,
                                    required: false
                                },
                                number: {
                                    type: String,
                                    required: false
                                }
                                ,
                                size: {
                                    type: String,
                                    required: false
                                },
                                employee: {
                                    type: String,
                                    required: true,
                                    default: 'Niko'
                                },
                                date: {
                                    type: Date,
                                    required: true,
                                    default: Date.now()
                                }

                            }
                        ],
                        required: false
                    }
                }], 
                required: true
            },
        },
    },
    subjectApply: {
        type: [
            {
                currentApply: {
                    type: Number,
                    required: false,
                    default: 0,
                },
                maxApply: {
                    type: Number,
                    required: false,
                    default: -1,
                },
                name: {
                    type: String,
                    required: false,
                },
                time: {
                    type: Date,
                    required: false
                },
                place: {
                    type: String,
                    required: false
                },
                deadline: {
                    type: Date,
                    required: false
                },
                uploadFileNedded: {
                    type: Boolean,
                    required: false
                },
                date: {
                    type: Date,
                    required: true,
                    default: new Date()
                },
                open: {
                    type: Boolean,
                    required: true,
                    default: true
                }


            }
        ],
        required: false
    }
}
);


export default mongoose.model('Subject', SubjectModel, 'Subject');


import OfferedProject from "../model/OfferedProject";

const offeredProjects = [
    {
        title: 'Simulator iz ORT2',
        type: 'Predlog za izradu diplomskog rada',
        description: 'Simulator za potrebe izrade laboratorijskij mrezi iz orta2',
        readMore: 'https://www.stanford.edu/'
    },
    {
        title: 'Informacioni sistem za banka',
        type: 'Predlog za izradu projekta',
        description: 'Informacioni sistem za inostranu banku',
        readMore: 'https://www.stanford.edu/'
    },
    {
        title: 'Aplikacija za pracanje zdravlja na androidu',
        type: 'Predlog za izradu projekta',
        description: '/',
        readMore: 'https://www.etf.bg.ac.rs/#gsc.tab=0'
    },
    {
        title: 'Prevodila za programski jezik MikroJava',
        type: 'Predlog za izradu diplomskog rada',
        description: 'Nadogradnja domaceg zadatka iz programskih prevodioca 1',
        readMore: 'https://www.stanford.edu/'
    },
    {
        title: 'Internet aplikacija za potrebe rada fakulteta',
        type: 'Predlog za izradu master rada',
        description: 'Internet aplikacia koja ce se koristi za potrebe rada fakulteta',
        readMore: 'https://www.etf.bg.ac.rs/#gsc.tab=0'
    },
]



async function seedOfferedProject() {
    for (const one of offeredProjects) {
        let newOfferedProject = new OfferedProject(one);
        await newOfferedProject.save();

    }
}

export default seedOfferedProject;
import EmployeeProject from '../model/EmployeeProjects'


const EmployeeProjects = [
    {
        title: 'Big Data Pipeline - Podaci kao osnova za razvoj AI aplikacija',
        description: '/',
        authors: ['', '', ''],
        readMore: 'https://www.etf.bg.ac.rs/#gsc.tab=0'
    },
    {
        title: 'Razvoj network and service reporting system softverske platforme',
        description: '/',
        authors: ['', '', ''],
        readMore: 'https://www.stanford.edu/'
    },
    {
        title: 'Novel oil pipeline leakage detection system-NOPiLDeS',
        description: 'Novel oil pipeline leakage detection system-NOPiLDeS-Program saradnje nauke i privrede -Fond za inovacionu delatnost',
        authors: ['', '', ''],
        readMore: 'https://www.stanford.edu/'
    },
    {
        title: 'Razvoj network and service reporting system softverske platforme',
        description: '',
        authors: ['', '', ''],
        readMore: 'https://www.etf.bg.ac.rs/#gsc.tab=0'
    }
]

async function seedEmployeeProject() {
    for (const one of EmployeeProjects) {
        let newEmployeeProject = new EmployeeProject(one);
        await newEmployeeProject.save()
    }
}

export default seedEmployeeProject;
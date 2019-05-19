import React from 'react';
import b_ from 'b_';

import IssueCard from '../issue-card';

import IssuesFilter from '../issues-filter';
import SearchBar from '../search-bar';
import './issues.css';

const b = b_.with('issues');

class Issues extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            issues: [],
            error: null
        };
    }

    async componentDidMount() {
        let json = [
            {
                "coordinates": {
                    "lat": -8.369326,
                    "lon": 115.166023,
                    "address": "Улица Пушкина, дом Колотушкина"
                },
                "description": "Пятикупольный храм, выполненный в русско-византийском стиле[4], является двухуровневым. Верхний храм во имя Всех святых, в земле Российской просиявших — высокий и со множеством окон, с уникальным беломраморным иконостасом. Нижний храм в честь новомучеников и исповедников Церкви Русской по контрасту спланирован полумрачным и с низкими сводами, но именно здесь находится крипта, символически воссоздающая расстрельную комнату, в которой погиб бывший царь с супругой, пятью детьми и четырьмя приближенными. В храмовый комплекс также входит отдельно стоящее здание Патриаршего подворья, включающего в себя Музей святой Царской семьи, концертный зал с «царским» роялем, личные покои патриарха и прочие помещения[1].",
                "image": "https://upload.wikimedia.org/wikipedia/commons/8/86/Свято-Покровский_храм_%2801%29.jpg",
                "name": "Построить храм",
                "uid": "90e08891-976b-4f23-b4a7-a7c7d3405595",
                "votes": 100
            },
            {
                "coordinates": {
                    "lat": -8.369326,
                    "lon": 115.166023,
                    "address": "Улица Пушкина, дом Колотушкина"
                },
                "description": "Пятикупольный храм, выполненный в русско-византийском стиле[4], является двухуровневым. Верхний храм во имя Всех святых, в земле Российской просиявших — высокий и со множеством окон, с уникальным беломраморным иконостасом. Нижний храм в честь новомучеников и исповедников Церкви Русской по контрасту спланирован полумрачным и с низкими сводами, но именно здесь находится крипта, символически воссоздающая расстрельную комнату, в которой погиб бывший царь с супругой, пятью детьми и четырьмя приближенными. В храмовый комплекс также входит отдельно стоящее здание Патриаршего подворья, включающего в себя Музей святой Царской семьи, концертный зал с «царским» роялем, личные покои патриарха и прочие помещения[1].",
                "image": "https://upload.wikimedia.org/wikipedia/commons/8/86/Свято-Покровский_храм_%2801%29.jpg",
                "name": "Построить храм",
                "uid": "7ef22cf0-b705-4713-936e-1225b9d28b16",
                "votes": 11
            }
        ];

        this.setState({
            loaded: true,
            issues: json
        });

        // try {
        //     const res = await fetch('http://130.193.41.152:5000/issues');
        //     const json = await res.json();

        //     this.setState({
        //         loaded: true,
        //         issues: json
        //     });
        // } catch (error) {
        //     this.setState({
        //         loaded: true,
        //         error
        //     });
        // }
    }

    render() {
        const { issues } = this.state;

        return (
            <div className={b()}>
                <IssuesFilter />
                <SearchBar />
                {issues.map(issue => (
                    <IssueCard
                        uid={issue.uid}
                        image={issue.image}
                        name={issue.name}
                        address={issue.coordinates.address}
                        description={issue.description}
                        votes={issue.votes}
                        key={issue.uid}
                    />
                ))}
            </div>
        );
    }
}

export default Issues;

import React from 'react';
import b_ from 'b_';

import VotesBlock from '../votes-block';
import './issue-info.css';

const b = b_.with('issue-info');

class IssueInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            issue: {},
            error: null
        };
    }

    async componentDidMount() {
        let json = {
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
        };

        this.setState({
            loaded: true,
            issue: json
        });

        // const res = await fetch('http://130.193.41.152/issue/id');
        // json = await res.json();

        // try {
        //     this.setState({
        //         loaded: true,
        //         issue: json
        //     });
        // } catch (error) {
        //     this.setState({
        //         loaded: true,
        //         error
        //     });
        // }
    }

    render() {
        const {
            issue: {
                image,
                name,
                address,
                description,
                votes
            }
        } = this.state;

        return (
            <div className={b()}>
                <img className={b('image')} src={image} alt="Фото" />
                <div className={b('info')}>
                    <h2 className={b('name')}>{name}</h2>
                    <span className={b('address')}>{address}</span>
                    <span className={b('description')}>{description}</span>
                    <VotesBlock votes={votes} />
                </div>
            </div>
        );
    }
}

export default IssueInfo;

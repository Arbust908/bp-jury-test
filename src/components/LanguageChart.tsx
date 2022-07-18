import Chart from 'react-apexcharts';
import type { Lang } from '../types';
  import { langColorMaker } from '../logic'


type Props = {
  languages: Lang[]
}
function LanguageChart(props: Props) {
  const { languages } = props;

  const averagePercentage = languages.reduce((acc, lang) => acc + lang.value, 0) / languages.length;
  const newLang = languages.reduce((acc, lang) => {
    if (lang.value <= averagePercentage || lang.name === 'Others') {
      const others = acc.find(l => l.name === 'Others')
      if (others) {
        others.value += lang.value;
      } else {
        acc.push({
          name: 'Others',
          value: lang.value
        } as Lang)
      }
    } else {
      acc.push(lang);
    }
    return acc;
  }, [] as Lang[]).sort((a, b) => b.value - a.value);

  const options = {
    labels: newLang.map(lang => lang.name),
    legend: false,
    colors: newLang.map(lang => langColorMaker(lang.name)),
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              formatter: function (val: string) {
                return val
              }
            },
            value: {
              formatter: function (val: number) {
                return `${val} Repos`
              }
            },
            total: {
              show: true,
              label: 'Repos',
              fontSize: '24px',
              fontWeight: 800,
              color: '#373d3f',
              formatter: function (w: any) {
                return w.globals.seriesTotals.reduce((a: number, b: number) => {
                  return a + b
                }, 0)
              }
            }
          }
        }
      }
    }
  }
  const series = newLang.map(lang => lang.value)

  console.log(series)

  return (
    // Ver si puedo traer el tipo de ApexOptions
    <Chart options={options} series={series} type="donut" width="380" />
  )
}

export { LanguageChart }
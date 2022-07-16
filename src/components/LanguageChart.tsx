import Chart from 'react-apexcharts';
import type { Lang } from '../types';


type Props = {
  languages: Lang[]
}
function LanguageChart(props: Props) {
  const { languages } = props;

  const options = {
    labels: languages.map(lang => lang.name),
  }
  const series = languages.map(lang => lang.value)

  return (
    <Chart options={options} series={series} type="donut" width="380" />
  )
}

export { LanguageChart }
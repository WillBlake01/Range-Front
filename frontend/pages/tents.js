import ComponentPadding from '../components/styles/ComponentPadding';
import AlternateHeader from '../components/AlternateHeader';
import Tents from '../components/Tents';

const TentsPage = props => (
  <div>
    <AlternateHeader />
    <ComponentPadding>
      <Tents page={parseFloat(props.query.page) || 1} />
    </ComponentPadding>
  </div>
);

export default TentsPage;

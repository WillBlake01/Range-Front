import ComponentPadding from '../components/styles/ComponentPadding';
import AlternateHeader from '../components/AlternateHeader';
import Tents from '../components/Tents';

const TentsPage = ({ query }) => (
  <>
    <AlternateHeader />
    <ComponentPadding>
      <Tents page={parseFloat(query.page) || 1} />
    </ComponentPadding>
  </>
);

export default TentsPage;

import ComponentPadding from '../components/styles/ComponentPadding';
import AlternateHeader from '../components/AlternateHeader';
import SleepingBags from '../components/SleepingBags';

const SleepingBagsPage = ({ query }) => (
  <>
    <AlternateHeader />
    <ComponentPadding>
      <SleepingBags page={parseFloat(query.page) || 1} />
    </ComponentPadding>
  </>
);

export default SleepingBagsPage;

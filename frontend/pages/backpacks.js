import ComponentPadding from '../components/styles/ComponentPadding';
import AlternateHeader from '../components/AlternateHeader';
import Backpacks from '../components/Backpacks';

const BackpacksPage = ({query}) => (
  <>
    <AlternateHeader />
    <ComponentPadding>
      <Backpacks page={parseFloat(query.page) || 1} />
    </ComponentPadding>
  </>
);

export default BackpacksPage;

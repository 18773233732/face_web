import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${'牙科诊所预约系统'}`}
      links={[
        {
          key: 'null',
          title: null,
          href: '/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;

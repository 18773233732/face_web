import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${'Hnust 校园疫情监测系统'}`}
      links={[
        {
          key: 'github',
          title: '',
          href: '',
        },
      ]}
    />
  );
};

export default Footer;

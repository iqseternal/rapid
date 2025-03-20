import { Button } from 'antd';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* 友情链接 */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://example.com" className="hover:text-gray-400">友情链接1</a>
            <a href="https://example.com" className="hover:text-gray-400">友情链接2</a>
            <a href="https://example.com" className="hover:text-gray-400">友情链接3</a>
          </div>

          {/* 备案信息 */}
          <div className="text-sm">
            <Button
              type='link'
              onClick={() => {
                window.open(`https://beian.miit.gov.cn/`);
              }}
            >
              蜀ICP备2021032446号-2
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;

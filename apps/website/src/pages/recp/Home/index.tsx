import { memo, useRef, useEffect, useState, useLayoutEffect } from 'react';
import { animated } from '@react-spring/web';
import { Button } from 'antd';
import { classnames } from '@rapid/libs-web';
import { h_b1, h_b2, h_b3, h_b4 } from '@/assets';

import gsap from 'gsap';

const features = [
  {
    title: '简单易用',
    description: '简单易用的界面设计，让您的工作流程更加顺畅',
    icon: '🚀',
    bgImage: h_b1,
    pattern: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
  },
  {
    title: '强大性能',
    description: '强大的数据处理能力，快速响应您的每一个需求',
    icon: '⚡',
    bgImage: h_b2, // 深色数据可视化
    pattern: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 75%)',
  },
  {
    title: '安全可靠',
    description: '安全可靠的数据保护，确保您的信息万无一失',
    icon: '🛡️',
    bgImage: h_b3, // 深色网络安全
    pattern: 'repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 10px)',
  },
  {
    title: '灵活定制',
    description: '灵活的定制选项，满足您的个性化需求',
    icon: '🎨',
    bgImage: h_b4, // 深色代码界面
    pattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 20%, rgba(255,255,255,0.05) 40%)',
  }
];

const Home = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollTime = useRef(Date.now());
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime.current < 50) return;
      lastScrollTime.current = now;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const scrollY = window.scrollY;
          const sectionHeight = windowHeight + windowHeight * 0.3;
          const currentSection = Math.round(scrollY / sectionHeight);

          if (currentSection !== activeSection) {
            setActiveSection(currentSection);
          }

          ticking = false;
        });
      }
      ticking = true;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  // 创建中心装饰元素动画
  useEffect(() => {
    const container = document.querySelector('.center-decoration');
    if (!container) return;

    // 创建六边形环
    const createHexagonRing = () => {
      const hexagon = document.createElement('div');
      hexagon.className = 'absolute w-[600px] h-[600px] border-2 border-white/10 rounded-full';
      container.appendChild(hexagon);

      gsap.set(hexagon, {
        rotation: gsap.utils.random(0, 360),
        scale: 0.8,
      });

      gsap.to(hexagon, {
        rotation: '+=360',
        duration: gsap.utils.random(20, 30),
        repeat: -1,
        ease: 'none',
      });

      // 在环上添加光点
      for (let i = 0; i < 6; i++) {
        const dot = document.createElement('div');
        dot.className = 'absolute w-3 h-3 bg-white/30 rounded-full blur-[2px]';
        hexagon.appendChild(dot);

        const angle = (i / 6) * Math.PI * 2;
        const x = Math.cos(angle) * 300;
        const y = Math.sin(angle) * 300;

        gsap.set(dot, {
          x,
          y,
          scale: gsap.utils.random(0.8, 1.2),
        });
      }
    };

    // 创建多个旋转环
    for (let i = 0; i < 3; i++) {
      createHexagonRing();
    }

    // 创建中心光球
    const createCenterOrb = () => {
      const orb = document.createElement('div');
      orb.className = 'absolute w-[200px] h-[200px] rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-[20px]';
      container.appendChild(orb);

      gsap.to(orb, {
        scale: 1.2,
        opacity: 0.6,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    };

    createCenterOrb();

    // 清理函数
    return () => {
      container.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const spacerIndex = parseInt(entry.target.getAttribute('data-index') || '0');
            setCurrentBgIndex(() => {
              if (spacerIndex >= features.length) return 0;
              return spacerIndex;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.perspective-spacer').forEach(spacer => {
      observer.observe(spacer);
    });

    return () => observer.disconnect();
  }, []);

  // 预加载所有背景图片
  useLayoutEffect(() => {
    const loadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    };

    Promise.allSettled(features.map(feature => loadImage(feature.bgImage)))
      .finally(() => {
        setImagesLoaded(true);
      });
  }, []);

  return (
    <div ref={containerRef} className='w-full min-h-screen relative'>
      <div
        className={classnames(
          'fixed top-0 left-0 w-full h-screen inset-0 -z-10 bg-cover bg-center',
        )}
        style={{
          background: `url(${features[currentBgIndex].bgImage})`
        }}
      />

      <section
        className='relative min-h-screen w-full h-screen flex items-center overflow-hidden'
        ref={el => {
          sectionsRef.current[0] = el;
        }}
      >
        {/* 首屏内容 */}
        <div className='relative w-full'>
          <div className='min-h-screen flex items-center relative'>
            <div className='max-w-6xl w-full mx-auto px-4 flex flex-col md:flex-row items-center gap-4'>
              <div className='md:w-1/2 md:z-10'>
                <div className='backdrop-blur-sm rounded-2xl p-12 text-white space-y-8'>
                  <h1 className='text-7xl font-bold relative animate-fade-in'>
                    Rapid
                  </h1>
                  <p className='text-2xl relative animate-fade-in-delay'>
                    完备的编写示例
                  </p>
                  <div className='relative animate-fade-in-delay-2'>
                    <Button
                      type='primary'
                      size='large'
                      className='h-12 px-8 text-lg bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105'
                      onClick={() => {
                        window.open(`http://rapid-doc.oupro.cn/`);
                      }}
                    >
                      点击查看文档
                    </Button>
                  </div>
                </div>
              </div>

              {/* 右侧装饰区域 */}
              <div className='md:w-1/2 relative h-[600px] md:-ml-32 z-10'>
                {/* 中心装饰元素 */}
                <div className='center-decoration absolute -left-1/4 inset-y-0 w-[800px] flex items-center justify-center'>
                  {/* GSAP will inject elements here */}
                </div>
                {/* 装饰性遮罩 - 移动端显示 */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden' />
              </div>
            </div>
          </div>
        </div>

        <div className='absolute top-0 left-0 w-full h-full inset-0 block'>
          <div className='absolute inset-0 bg-black'>
            <div className='particle-grid absolute inset-0' />
            <div className='absolute inset-0 bg-gradient-radial from-transparent via-black/50 to-black/80' />
            {/* 光效装饰 */}
            <div className='absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse' />
            <div className='absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse'
              style={{ animationDelay: '1s' }}
            />
          </div>
        </div>
      </section>

      {/* 特点屏幕 */}
      {features.map((feature, index) => (
        <div key={index}>

          {/* 透视间隔 */}
          <div
            className='perspective-spacer h-[30vh] opacity-0'
            data-index={index}
            aria-hidden='true'
          />

          <section
            className='relative min-h-[95vh] w-full flex items-center justify-center'
            ref={el => {
              sectionsRef.current[index] = el;
            }}
          >
            {/* Section内容 */}
            <div className='relative w-full z-10'>
              <div className='bg-black py-20'>
                <div className='max-w-7xl mx-auto px-4'>
                  <div
                    className='backdrop-blur-sm rounded-2xl p-8 md:p-12'
                    style={{
                      background: `${feature.pattern}, rgba(255,255,255,0.05)`,
                      backgroundSize: '30px 30px, cover',
                    }}
                  >
                    <div className='flex flex-col md:flex-row items-center justify-between gap-12 text-white relative'>
                      <div className='flex-1 space-y-6'>
                        <div className='text-8xl mb-8'>{feature.icon}</div>
                        <h2 className='text-5xl font-bold mb-4'>{feature.title}</h2>
                        <p className='text-xl opacity-80'>{feature.description}</p>
                      </div>
                      <div className='flex-1'>
                        <div className='w-full aspect-square rounded-2xl bg-white/10 backdrop-blur-md
                            shadow-lg transform hover:scale-105 transition-transform duration-300' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      ))}

      {/* 滚动指示器 */}
      <div className='fixed bottom-8 left-1/2 -translate-x-1/2 z-50'>
        <div className='flex gap-2'>
          {[...Array(features.length + 1)].map((_, i) => {

            return (
              <div
                key={i}
                className={classnames(
                  `w-2 h-2 rounded-full transition-all duration-300`,
                  activeSection === i ? 'bg-white scale-150' : 'bg-white/50'
                )}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
});

export default Home;

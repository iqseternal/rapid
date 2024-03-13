<template>
  <SettingContent title="通用设置">
    <ASpace direction="vertical" size="large">
      <ACheckbox>开机自动启动</ACheckbox>
      <ACheckbox>启用无障碍功能</ACheckbox>
      <OptionsTip title="已按系统设置的比例放大到了125%。如无需放大，可关闭高清适配">
        <ACheckbox>是否开启高清适配</ACheckbox>
      </OptionsTip>
    </ASpace>
  </SettingContent>

  <SettingContent title="文件下载">
    <ASpace direction="vertical" size="large">
      <ACheckbox>下载前询问每个文件保存位置</ACheckbox>
    </ASpace>
  </SettingContent>
</template>

<script lang="ts" setup>
import SettingContent from '@pages/setting/components/SettingContent';
import OptionsTip from '@pages/setting/components/OptionsTip';

</script>


<style lang="scss" scoped>

</style>

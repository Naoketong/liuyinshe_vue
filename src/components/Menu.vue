<template>
  <div>
    <div class="logo-container">
      <img class="logo" src="https://qccdata.qichacha.com/AutoImage/29bee9a3af285c0b1c98d9796b6e1c67.jpg?x-oss-process=image/resize,w_120">
      <span>后台信息管理</span>
    </div>
    <el-col>
      <el-menu :default-active="path" :router="true" :collapse="collapse">
        <template v-for="route in filterRoutes">
          <el-submenu
            v-if="hasNavChildren(route)"
            :index="route.path"
            :key="route.path"
          >
            <template slot="title">
              <i v-if="route.meta.nav.icon" :class="route.meta.nav.icon"></i>
              <span slot="title">{{ route.meta.nav.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="route in route.children"
                :key="route.path"
                :index="route.path"
                :route="{ path: route.path }"
                :id="route.name"
              >
                <i v-if="route.meta.nav.icon" :class="route.meta.nav.icon"></i>
                <span slot="title">{{ route.meta.nav.title }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item
            v-else
            :key="route.path"
            :disabled="route.disabled"
            :index="route.path"
            :route="{ path: route.path }"
            :id="route.name"
          >
            <i v-if="route.meta.nav.icon" :class="route.meta.nav.icon"></i>
            <span slot="title">{{ route.meta.nav.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
import routes from '@/router/routes'
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      path: this.$route.path,
      filterRoutes: []
    };
  },
  created() {
    this.getRoutes();
  },
  watch: {
    $route(to) {
      this.path = to.path;
    }
  },
  methods: {
    getRoutes() {
      this.filterRoutes = this.filterNavigator(routes);
    },
    filterNavigator(node) {
      let result = [];
      node.forEach(data => {
        if (data.meta && data.meta.nav) {
          let item = {
            path: data.path,
            name: data.name,
            meta: data.meta
          };
          if (data.children) {
            item.children = this.filterNavigator(data.children);
          }
          result.push(item);
        } else if (data.children) {
          this.filterNavigator(data.children).forEach(item =>
            result.push(item)
          );
        }
      });
      return result;
    },
    hasNavChildren(route) {
      const children = route.children || [];
      return children.some(data => data.meta && data.meta.nav);
    }
  }
};
</script>

<style scoped lang="less">
  .menu-items{
    color: #409EFF;
  }
  .logo-container{
    height: 59px;
    line-height: 59px;
    color: #002140;
    font-size: 14px;
    border-bottom: 1px solid #e4e4e4;

    .logo{
      height: 40px;
      margin: 10px 20px;
      vertical-align: middle;
      border-radius: 3px;
    }
  }

  .el-menu{
    border-right: 0;
  }
</style>

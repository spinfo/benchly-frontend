<template>
<div v-if="max > limit">
    <span v-for="(link, i) in links">
        <span v-if="(i + 1) == currentPage">
            {{ i + 1 }}
        </span>
        <span v-else>
            <router-link :to="link">{{ i + 1 }}</router-link>
        </span>
        <span v-if="(i + 1) != maxPage"> | </span>
    </span>

</div>
</template>


<script>

export default {
    props: {
        limit: Number,
        offset: Number,
        max: Number
    },
    computed: {
        maxPage: function() {
            return this.pageFor(this.max)
        },
        currentPage: function() {
            return this.pageFor(this.offset + 1)
        },
        links: function() {
            var links = []
            var offset = 0

            for (let i = 0; i < this.maxPage; i++) {
                links.push({
                    path: this.$route.path,
                    query: {
                        offset: offset,
                        limit: this.limit
                    }
                })
                offset += this.limit
            }

            return links
        }
    },
    methods: {
        pageFor: function(n)  {
            return Math.ceil(n / this.limit)
        }
    }
}

</script>

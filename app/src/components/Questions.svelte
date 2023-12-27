<div class="card variant-ringed-secondary p-4 m-4">
    <header class="card-header">
        <h2>
            <slot name="round">
                <span class="missing">Unknown</span>
            </slot>
        <br>Question #
            <slot name="number">
                <span class="missing">Unknown</span>
            </slot>
        </h2>
    </header>
    <section class="p-4">
        <slot name="question">
            <span class="missing">Unknown</span>
        </slot>
    </section>
    <footer class="card-footer">
        <p class="italic">
            <slot name="answer">
                <span class="missing">Unknown</span>
            </slot>
        </p>
    </footer>
</div>
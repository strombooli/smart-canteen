<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* table/partition/drop.twig */
class __TwigTemplate_a68660fbfa8cc5516b89df8811fb7567e11cf541fdc03b979e1b3ac6c367ce0b extends \Twig\Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<div class=\"container-fluid\">
  <h2>";
        // line 2
        echo _gettext("Drop partition");
        echo "</h2>

  ";
        // line 4
        echo ($context["message"] ?? null);
        echo "
</div>
";
    }

    public function getTemplateName()
    {
        return "table/partition/drop.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  45 => 4,  40 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "table/partition/drop.twig", "E:\\IIS Servers\\smart-canteen\\assets\\phpMyAdmin\\templates\\table\\partition\\drop.twig");
    }
}

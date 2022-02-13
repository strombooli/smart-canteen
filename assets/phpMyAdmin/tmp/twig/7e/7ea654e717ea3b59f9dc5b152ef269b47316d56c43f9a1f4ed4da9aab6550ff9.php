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

/* table/partition/rebuild.twig */
class __TwigTemplate_18d10cf3b53d959c24294a35b43e25c39b1df1879ecb0bd8613a253b3b7faabc extends \Twig\Template
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
        echo _gettext("Rebuild partition");
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
        return "table/partition/rebuild.twig";
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
        return new Source("", "table/partition/rebuild.twig", "E:\\IIS Servers\\smart-canteen\\phpMyAdmin\\templates\\table\\partition\\rebuild.twig");
    }
}
